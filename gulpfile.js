///////////
// Setup //
///////////

//url must be the actual shop url-it will not work if there is a redirect on the url you set
//Browsersync is not required, if you don't want to use it just don't use the localhost proxy

var clientName = 'LintTest',
	projectName = clientName.toLowerCase(),
	url = 'https://store.shopify.com/';

/////////////
// Modules //
/////////////
var gulp = require('gulp'),
	jshint = require ('gulp-jshint'),
	concat = require('gulp-concat'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	size = require('gulp-filesize'),
	autoprefixer = require('autoprefixer'),
	postCss = require('gulp-postcss'),
	mqPacker = require('css-mqpacker'),
	pxToRem = require('postcss-pxtorem'),
	sourceMaps = require('gulp-sourcemaps'),
	doiuse = require('doiuse'),
	cssNano = require('gulp-cssnano'),
	browserSync = require('browser-sync').create(),
	shell = require('gulp-shell'),
	filter = require('gulp-filter'),
	watch = require('gulp-watch'),
	cacheBuster = require('postcss-cachebuster'),
	mkdirp = require('mkdirp'),
	gitStatus = require('git-rev-sync'),
	stylelint = require('gulp-stylelint'),
	stylelint_scss = require('stylelint-scss'),
	fs = require("fs"),
	git_branch = '';

///////////
// Tasks //
///////////


/////////
// CSS //
/////////

gulp.task('css:postsass', function(){

	gutil.log(gutil.colors.blue('--> LINTING SCSS'));
	gulp.src('src/css/scss/**/*.scss')
		.pipe(stylelint({
			failAfterError: true,
			reportOutputDir: "reports/",
			reporters: [
				{ formatter: 'verbose', console: true},
				{ formatter: 'json', save: 'report.json'}
			],
			debug: true
		}));
	gutil.log(gutil.colors.blue('--> THE PAIN OF LINTING IS COMPLETE'));

});


///////////////////
// Coupled Tasks //
///////////////////

gulp.task('default', ['css:postsass'], function() {

	// watch for sass changes
	gulp.watch('src/css/scss/**/*.scss', ['css:postsass']);

});