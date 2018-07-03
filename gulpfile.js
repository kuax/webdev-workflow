var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var log = require('fancy-log');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var paths = {
    scss: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    cshtml: '../**/*.cshtml'
};

gulp.task('sass', function() {
    return gulp.src(paths.scss)
                .pipe(plumber())
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
                .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {

    browserSync.init({
        port: 3000,
        proxy: "localhost:63123",
        browser: []
    });

    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.js, ['js:webpack']);

    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./css/*.css').on('change', browserSync.reload);
    gulp.watch(paths.cshtml).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'sass']);
