"use strict";

var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean'),
    plumber = require('gulp-plumber');

gulp.task('images', ['clean-img'], function() {
    return gulp.src('./src/img/**/*')
        .pipe(plumber({errorHandler: function(err) {
            console.log('\n_______\n' + err + '\n_______\n');
            this.emit('end');
        }}))
        .pipe(imagemin({ 
            optimizationLevel: 3,
            progressive: true, 
            interlaced: true 
        }).on('error',function(e){
            console.log(e);
            this.end();
          }))
        .pipe(gulp.dest('./public/img'))
        .pipe(notify({ message: 'Images complete' }))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean-img', function() {
    return gulp.src('./public/img/**/*', {read: false})
		.pipe(clean());
});