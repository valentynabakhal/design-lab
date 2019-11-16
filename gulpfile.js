'use strict';

var gulp       	 = require('gulp');
var browserSync	 = require('browser-sync').create();
var sass       	 = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rigger       = require('gulp-rigger');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src([
        'src/**/*.html',
        '!src/partials/_*.html'])
        .pipe(rigger())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('html', 'img', 'sass', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/*.scss", gulp.parallel('sass'));
    gulp.watch("src/**/*.html", gulp.parallel('html'));
    gulp.watch("src/img/**/*.*", gulp.parallel('img'));
}));


gulp.task('default', gulp.series('serve'));