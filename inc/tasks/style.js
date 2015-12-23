"use strict";

var gulp = require('gulp'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber');



gulp.task('scss', ['compass-compile'], function() {
	return gulp.src('./src/sass/**/*')
		.pipe(gulp.dest('./public/sass'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('compass-compile', function() {
	return gulp.src('./src/sass/*.scss')
		.pipe(plumber({errorHandler: function(err) {
			console.log('\n_______\n' + err + '\n_______\n');
			this.emit('end');
		}}))
		.pipe(compass({
		  css: './src/css',
		  image: './src/img',
		  sass: './src/sass'
		}))
		.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe(notify({ message: 'Styles complete' }))
		.pipe(gulp.dest('./public/css'));

});