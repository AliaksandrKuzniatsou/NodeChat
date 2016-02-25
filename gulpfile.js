/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  
});

gulp.task('start', function () {
        nodemon({
            script: './bin/www',
            ext: 'js',
            ignore: ['public'],
            tasks: [],
            execMap: {
                js: "node --harmony"
            },
            env: { 'NODE_ENV': 'development' }
        }).on('restart', function () {
            gutil.log('Ready to fire!')
        })
    });