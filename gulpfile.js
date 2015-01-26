var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var del = require('del');

gulp.task('build', ['deps', 'sass', 'html', 'browserify']);

gulp.task('watch', function() {
    gulp.watch('./sass/*.sass', ['sass']);
    gulp.watch('./js/*.js', ['browserify']);
    gulp.watch('./html/*.html', ['html']);
});

gulp.task('clean', function (cb) {
    del('dist/*', cb);
});

gulp.task('browserify', function () {
    return browserify('./js/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('html', function () {
    gulp.src('./html/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
    // custom
    gulp.src('./sass/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css/'));

});

gulp.task('deps', function () {
    // js
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/bootstrap-select/dist/js/bootstrap-select.js',
        './bower_components/bootstrap-material-design/dist/js/material.js',
        './bower_components/bootstrap-material-design/dist/js/ripples.js',
    ]).pipe(gulp.dest('./dist/js/'));
    // css
    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/bootstrap-select/dist/css/bootstrap-select.css',
        './bower_components/bootstrap-material-design/dist/css/material.css',
        './bower_components/bootstrap-material-design/dist/css/ripples.css',
    ]).pipe(gulp.dest('./dist/css/'));
});
