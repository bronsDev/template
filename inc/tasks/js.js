"use strict";

var gulp = require('gulp'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber');

gulp.task('js', ['js-copy-vendor'], function() {
	return gulp.src('./src/js/*.js')
	    .pipe(plumber({errorHandler: function(err) {
            console.log('\n_______\n' + err + '\n_______\n');
            this.emit('end');
        }}))
		.pipe(gulp.dest('./public/js'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(notify({ message: 'JS complete' }));	
});

gulp.task('js-copy-vendor', function() {
	return gulp.src('./src/js/vendor/*.js')
        .pipe(gulp.dest('./public/js/vendor'));
});