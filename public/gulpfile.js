/*
 Hootsuite Campaigns Builder Assets Build System
 Author: Hootsuite Campaigns Dev
 */

//************************************************************************//
//************************* Load Dependencies ****************************//
//************************************************************************//
var gulp                = require('gulp');
var imageop             = require('gulp-image-optimization');
var size                = require('gulp-filesize');
var rename              = require('gulp-rename');
var less                = require('gulp-less');
var cssmin              = require('gulp-minify-css');
var gutil               = require('gulp-util');
var webpack             = require('webpack');
var path                = require('path');
var uglify              = require('gulp-uglify');
var sourcemaps          = require('gulp-sourcemaps');
var watch               = require('gulp-watch');

//************************************************************************//
//****************************** Config **********************************//
//************************************************************************//

var config = {
    paths: {
        nodeMods: path.join(__dirname, '../node_modules/')
    }
};

/**
 * Optimize images and copy to relative dist folder
 * @author  James Player <james.player@hootsuite.com>
 */
gulp.task('images', function() {
    'use strict';

    gulp.src([
        'img/*.{gif,jpg,jpeg,png,svg}',
        '!**/dist/img/*'
    ], {base: './'})
        .pipe(imageop({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true
        }))
        .pipe(rename(function(path){
            path.dirname += '/../dist/img';
        }))
        .pipe(gulp.dest('.'))
        .pipe(size());

    return true;
});

/**
 * Copy fonts to relative _dist folder
 * @author  James Player <james.player@hootsuite.com>
 */
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

/**
 * Compile less into css
 * @author  James Player <james.player@hootsuite.com>
 */
gulp.task('less', function() {
    'use strict';

    gulp.src([
        'less/style.less'
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));

    return true;
});

/**
 * Compile our JS
 * @author  James Player <james.player@hootsuite.com>
 */
gulp.task("js", function(callback) {

    // run webpack http://webpack.github.io/docs/tutorials/getting-started/
    webpack({

        // Aliases
        resolve: {
            alias: {
                jquery:         config.paths.nodeMods + 'jquery/dist/jquery.min.js',
                bootstrap:      config.paths.nodeMods + 'bootstrap/dist/js/bootstrap.min.js',
                scrollreveal:   config.paths.nodeMods + 'scrollreveal/dist/scrollReveal.min.js',
                'jquery-validation': config.paths.nodeMods + 'jquery-validation/dist/jquery.validate.js'
            }
        },

        // Entry points. Bundles get created based off these files.
        entry: {

            // all.bundle.js
            all: "./js/entry.js",
        },

        // Naming conventions of bundled files
        output: {
            path: "./dist/js",
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

            // Uglify (except for ckeditor which is already uglified to save time)
            new webpack.optimize.UglifyJsPlugin()
        ]

    }, function(err, stats) {
        if(err) { throw new gutil.PluginError("webpack", err); }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

/**
 * Watcher for changes on less files and runs task
 * @author  James Player
 */
gulp.task('watch:less', function() {
    'use strict';

    gulp.watch(['./less/*.less'], ['less']);
    return true;
});

/**
 * Watcher for changes on JS files and runs task
 * @author  James Player
 */
gulp.task('watch:js', function() {
    'use strict';

    gulp.watch(['./js/*.js'], ['js']);
    return true;
});

/**
 * Task groups
 */
gulp.task('default',    ['less', 'js']);
gulp.task('watch',      ['watch:js', 'watch:less']);
gulp.task('build',      ['less', 'js', 'images']);