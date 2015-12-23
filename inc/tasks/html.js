"use strict";

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify');

gulp.task('html', function() {
	return gulp.src('./src/*.html')
		.pipe(plumber({errorHandler: function(err) {
            console.log('\n_______\n' + err + '\n_______\n');
            this.emit('end');
        }}))
		.pipe(gulp.dest('./public'))
		.pipe(notify({ message: 'Html complete' }))
		.pipe(browserSync.reload({stream: true}));
});