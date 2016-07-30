var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build', function () {
	// app.js is your main JS file with all your module inclusions
	return browserify({
			entries: './src/index.jsx',
			debug: true
		})
		.transform("babelify", {
			presets: ["es2015", "es2016", "react", "stage-0"]
		})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/js'))
});

gulp.task('watch', ['build'], function () {
	gulp.watch('./src/**', ['build']);
});

gulp.task('default', ['watch']);
