"use strict";

var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch', function(){
    watch('./src/*.html', function(event, cb) {
        gulp.start('html');
    });
    watch('./src/img/**/*', function(event, cb) {
        gulp.start('images');
    });
    watch('./src/sass/**/*', function(event, cb) {
        gulp.start('scss');
    });
    watch('./src/js/**/*', function(event, cb) {
        gulp.start('js');
    });
    watch('./src/fonts/**/*', function(event, cb) {
        gulp.start('fonts');
    });
    watch('./src/*', function(event, cb) {
        gulp.start('copy');
    });
});