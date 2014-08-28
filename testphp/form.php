<!DOCTYPE html>
<html>
<head>
<title> My PHP Lessons </title>
<style>
.error {
   color: red;
}
</style>
</head>
<body>

<h1 style="text-align: center">PHP form validation</h1>

<hr>

<?php
$name = $email = $gender = $comments = $website = "";
$nameErr = $emailErr = $genderErr = $websiteErr = "";

function process_input($data) {
   $data = trim($data); // remove extra space, tab, newline
   $data = stripslashes($data); // remove \
   $data = htmlspecialchars($data); // escape
   return $data;
}

if($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["name"])) {
      $nameErr = "Name is required";
   } else {
      $name = process_input($_POST["name"]);
      if(!preg_match("/^[a-zA-Z]+ *[a-zA-Z ]*$/",$name)) {
         $nameErr = "Only letters and white space allowed";
         $name = ""; 
      }
   }

   if(empty($_POST["email"])) {
      $emailErr = "Email is required";
   } else {
      $email = process_input($_POST["email"]);
      if(!preg_match("/.+@.+\..+/", $email)) {
         $emailErr = "That is not valid";
         $email = "";
      }
   }
   
   $website = process_input($_POST["website"]);
   if($website && !preg_match("/.+\..+/", $website)) {
      $websiteErr = "Not valid url";
      $website = "";
   }

   $comments = process_input($_POST["comments"]);
   
   if(empty($_POST["gender"])) {
      $genderErr = "Gender is required";
   } else {
      $gender = process_input($_POST["gender"]);
   }
   
}

?>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<p style="color: red">* required field</p>
<table>
<tr>
<td>
Name:
</td>
<td>
<input type="text" name="name" value="<?php echo $name; ?>">
</td>
<td>
<span class=error> * <?php echo $nameErr; ?> </span>
</td>
</tr>
<tr>
<td>
E-Mail:
</td>
<td>
<input type="email" name="email" value="<?php echo $email; ?>">
</td>
<td>
<span class=error> * <?php echo $emailErr; ?> </span>
</td>
</tr>
<tr>
<td>
Website:
</td>
<td>
<input type="url" name="website" value="<?php echo $website; ?>">
</td>
<td>
<span class=error> <?php echo $websiteErr; ?> </span>
</td>
</tr>
<tr>
<td>
Gender:
</td>
<td>
<input type="radio" name="gender" value="male" <?php if($gender == "male") echo "checked"; ?> > Male
<input type="radio" name="gender" value="female" <?php if($gender == "female") echo "checked"; ?>> Female
</td>
<td>
<span class=error> * <?php echo $genderErr; ?> </span>
</td>
</tr>
<tr>
<td>
Comments:
</td>
<td>
<textarea rows="4" cols="17" name="comments"><?php echo $comments; ?></textarea>
</td>
</tr>
</table>

<input type="submit">
</form>

<h2>Your Input</h2>
<?php
echo "Your name is $name <br>";
echo "Your email is $email <br>";
echo "Your website is $website <br>";
echo "Your are $gender <br>";
echo "$comments <br>";
?>

</body>
</html>