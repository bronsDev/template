"use strict";

var gulp = require('gulp');
	

gulp.task('server', function() {
    return browserSync.init({
        server: "./public"
    });
});