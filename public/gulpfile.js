var gulp                = require('gulp');
var imagemin            = require('gulp-imagemin');
var size                = require('gulp-filesize');
var rename              = require('gulp-rename');
var less                = require('gulp-less');
var cleanCSS            = require('gulp-clean-css');
var gutil               = require('gulp-util');
var webpack             = require('webpack');
var path                = require('path');
var uglify              = require('gulp-uglify');
var sourcemaps          = require('gulp-sourcemaps');
var watch               = require('gulp-watch');

var config = {
    paths: {
        nodeMods: path.join(__dirname, '../node_modules/')
    }
};


gulp.task('images', function() {
    'use strict';

    gulp.src([
        'img/*.{gif,jpg,jpeg,png,svg}',
        '!**/dist/img/*'
    ], {base: './'})
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 4}),
            imagemin.gifsicle({interlaced: true})
        ]))
        .pipe(rename(function(path){
            path.dirname += '/../dist/img';
        }))
        .pipe(gulp.dest('.'))
        .pipe(size());

    return true;
});


gulp.task('fonts', function() {
    'use strict';

    gulp.src([
        config.paths.nodeMods + 'bootstrap/fonts/*.{woff,woff2,svg,eot,ttf,otf}',
        '!**/dist/fonts/*',
        config.paths.nodeMods + 'font-awesome/fonts/*.{woff,woff2,svg,eot,ttf,otf}'
    ], {base: './'})
        .pipe(rename(function(path){
            path.dirname += '/../../../public/dist/fonts';
        }))
        .pipe(gulp.dest('.'));

    return true;
});


gulp.task('less', function() {
    'use strict';

    gulp.src([
        'less/style.less'
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));

    return true;
});


gulp.task("js", function(callback) {

    webpack({

        resolve: {
            alias: {
                jquery:           config.paths.nodeMods + 'jquery/dist/jquery.min.js',
                bootstrap:        config.paths.nodeMods + 'bootstrap/dist/js/bootstrap.min.js',
                jqueryValidation: config.paths.nodeMods + 'jquery-validation/dist/jquery.validate.js',
                scrollreveal:     config.paths.nodeMods + 'scrollreveal/dist/scrollReveal.min.js',
            }
        },

        entry: {
            // all.bundle.js
            all: "./js/entry.js",
        },

        // Naming conventions of bundled files
        output: {
            path: __dirname + "/dist/js",
            filename: "[name].bundle.js",
            chunkFilename: "[name].bundle.js",
            sourceMapFilename: "[file].map"
        },

        devtool: 'source-map',

        plugins: [

            // Always provide jquery
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),

            // Ignore locale
            new webpack.IgnorePlugin(/\.\/locale$/),

            // Uglify
            new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
        ]

    }, function(err, stats) {
        if(err) { throw new gutil.PluginError("webpack", err); }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});


gulp.task('watch:less', function() {
    'use strict';

    gulp.watch(['./less/*.less'], ['less']);
    return true;
});


gulp.task('watch:js', function() {
    'use strict';

    gulp.watch(['./js/*.js'], ['js']);
    return true;
});


gulp.task('default',    ['less', 'js']);
gulp.task('watch',      ['watch:js', 'watch:less']);
gulp.task('build',      ['less', 'js', 'images', 'fonts']);