"use strict";

var gulp = require('gulp'),
	plumber = require('gulp-plumber');


gulp.task('fonts', ['copy-fonts'], function() {

});

gulp.task('copy-fonts', function() {
	return gulp.src('./src/fonts/**/*')
		.pipe(plumber({errorHandler: function(err) {
			console.log('\n_______\n' + err + '\n_______\n');
			this.emit('end');
		}}))
        .pipe(gulp.dest('./public/fonts'))
        .pipe(browserSync.reload({stream: true}));
});