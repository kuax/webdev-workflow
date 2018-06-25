var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var log = require('fancy-log');
var plumber = require('gulp-plumber');

var paths = {
    scss: './src/sass/**/*.scss',
    js: './src/js/**/*.js'
};

gulp.task('sass', function() {
    return gulp.src(paths.scss)
                .pipe(sourcemaps.init())
                .pipe(sass({
                    outputStyle: 'compressed'
                }).on('error', sass.logError))
                .pipe(sourcemaps.write('./maps'))
                .pipe(gulp.dest('./css'));
});

gulp.task('js:webpack', function() {
    return gulp.src('./src/js/main.js')
                .pipe(plumber())
                .pipe(webpack(require('./webpack.config.js')).on('error', log.error))
                .pipe(gulp.dest('./js'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.js, ['js:webpack']);
});

gulp.task('default', ['watch', 'sass']);
