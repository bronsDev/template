"use strict";
var gulp = require('gulp'),
	requireDir = require('require-dir'),
	runSequence = require('run-sequence');

	//Globals
	global.browserSync = require('browser-sync').create();
	global.config = require('./inc/config.js');

//Include Tasks
requireDir('./inc/tasks', { recurse: true }); 


gulp.task('default', function() {
	runSequence(
		['server', 'clean'], 
		['images', 'scss', 'fonts', 'copy', 'html', 'js'],
		'watch'
	);
});
