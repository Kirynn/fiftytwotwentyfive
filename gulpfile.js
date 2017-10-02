/* jshint node: true */

var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var SASSlint = require('gulp-sass-lint');

var JSlint = require('gulp-jshint');

var SASSinput = './src/scss/**/*.+(scss|sass)';
var SASSoutput = path.resolve(__dirname);

var sassOpts  = {
    errLogToConsole: true
};

var autoprefixerOpts = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var SASSlintOpts = {
    configFile: './.sass-lint.yml'
};

var JSinput = './dist/js/**/*.js';

var JSlintOpts = {
    lookup: true
};

gulp.task('sass::build', function () {
    'use strict';
    return gulp
        .src(SASSinput)
        .pipe(SASSlint(SASSlintOpts))
        .pipe(SASSlint.format())
        .pipe(sass(sassOpts).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(autoprefixer(autoprefixerOpts))
        .pipe(gulp.dest(SASSoutput));
});

gulp.task('js::lint', function () {
    'use strict';
    return gulp
        .src(JSinput)
        .pipe(JSlint(JSlintOpts))
        .pipe(JSlint.reporter('jshint-stylish'));
});

gulp.task('sass::watch', function () {
    'use strict';
    gulp.watch(SASSinput, ['sass::build'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running task(s)...');
        });
    gulp.watch(JSinput, ['js::lint'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running task(s)...');
        });
});
