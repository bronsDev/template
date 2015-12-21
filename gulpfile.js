////////////////////////////////////Plugins

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	jshint = require('gulp-jshint'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
    watch = require('gulp-watch');

////////////////////////////////////Options


////////////////////////////////////Server

gulp.task('server', function() {

    browserSync.init({
        server: "./public"
    });

});

////////////////////////////////////Html

gulp.task('html', function() {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./public'))
		.pipe(notify({ message: 'Html task complete' }))
		.pipe(browserSync.reload({stream: true}));
});

////////////////////////////////////JS

gulp.task('js', ['js-copy-vendor'], function() {
	gulp.src('./src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default', { verbose: true }))
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({stream: true}));	
});

gulp.task('js-copy-vendor', function() {
	gulp.src('src/js/vendor/*.js')
        .pipe(gulp.dest('public/js/vendor'))
});

////////////////////////////////////SCSS

gulp.task('scss', ['compass-compile'], function() {
	gulp.src('./src/sass/**/*')
		.pipe(gulp.dest('./public/sass'))
		.pipe(notify({ message: 'Styles complete' }))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('compass-compile', function() {
	gulp.src('./src/sass/*.scss')
		.pipe(compass({
		  css: './src/css',
		  sass: './src/sass'
		}))
		.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
		.pipe(gulp.dest('./public/css'));
});



////////////////////////////////////images

gulp.task('images', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/img'))
        .pipe(notify({ message: 'Images complete' }))
        .pipe(browserSync.reload({stream: true}));
});


////////////////////////////////////Watch

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
});
////////////////////////////////////Input

gulp.task('default', ['server', 'html', 'images', 'scss', 'js'], function() {
	console.log('ready');
	gulp.src('./src/*')
		.pipe(gulp.dest('./public'));
	gulp.start('watch');
	browserSync.reload;

});
