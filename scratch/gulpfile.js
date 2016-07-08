var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var watch = require('gulp-watch');
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');


gulp.task('less', function () {
  return gulp.src('./frontend/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(uglifycss())
	.pipe(concat('style.min.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload())
});

gulp.watch('./frontend/less/*.less', ['less']); 

gulp.task('script', function() {
  return gulp.src(['./frontend/core.js'])
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});
gulp.watch('./frontend/*.js', ['script']); 


gulp.task('html', function() {
  return gulp.src(['./frontend/index.html'])
	.pipe(gulp.dest('./public'))    
	.pipe(livereload());
});
gulp.watch('./frontend/index.html', ['html']); 


gulp.task('watch', function() {
  livereload.listen();
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  })
});

gulp.task('default', [
    'less','script','html','watch','start'
]);