var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('default', ['watchApp']);

gulp.task('watchApp', function() {
  gulp.watch('src/**/*.scss', ['build:css']);
  gulp.watch('app/**/*.js', ['verify:js']);
});

gulp.task('verify:js', function() {
  gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(jscs())
    .pipe(jscs.reporter())
});

gulp.task('build:css', function() {
  gulp.src('./src/**/*.scss')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./bin/scss/'))
    .pipe(sass())
    .pipe(gulp.dest('./app/public/stylesheets/'));
});

gulp.task('build:app', ['build:css']);

gulp.task('clean:app', function() {
  del(['app/public/**/*.css', 'app/public/**/*.js']);
});
