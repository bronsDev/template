"use strict";

var gulp = require('gulp'),
	plumber = require('gulp-plumber');

gulp.task('copy', function() {
	return gulp.src('./src/*')
		.pipe(plumber({errorHandler: function(err) {
			console.log('\n_______\n' + err + '\n_______\n');
			this.emit('end');
		}}))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.reload({stream: true}));
});