//require all needed vars
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var mustache = require('gulp-mustache');
var purify = require('gulp-purifycss');

//Detect changes in files and autosync
gulp.task('check-server', function () {
    browserSync.init({
        baseDir: "dist/",
        server: "dist"
    });
    gulp.watch('src/assets/scss/*.scss', ['compile-sass']).on('change', browserSync.reload);
    gulp.watch('src/views/**/*.mustache', ['compile-mustache']).on('change', browserSync.reload);
    gulp.watch('src/assets/js/*.js', ['move-js']).on('change', browserSync.reload);
});

//Compile scss into css
gulp.task('compile-sass', function () {
    return gulp.src('src/assets/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browserSync.stream());
});

//Compile mustache to html
gulp.task('compile-mustache', function () {
    return gulp.src(['src/views/*.mustache'])
        .pipe(mustache({},
            {
                'extension': '.html'
            }, {})).on('error', function (error) {
            // We have an error
            console.log(error);
        })
        .pipe(gulp.dest('dist/')); //sent to root
});

//Remove all unused css
gulp.task('clean-css', function () {
    return gulp.src('dist/assets/css/main.css')
        .pipe(purify(['src/*.css']))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browserSync.stream());
});

//Move JSON files
gulp.task('move-json', function () {
    gulp.src("src/assets/json/*.json")
    gulp.src("src/views/common/json/*.json")
    .pipe(gulp.dest("dist/assets/json/"));
});

//Move JS files
gulp.task('move-js', function () {
    gulp.src("src/assets/js/**/*.js")
        .pipe(gulp.dest("dist/assets/js/"));
});

//Get jquery
gulp.task('move-jquery', function () {
    gulp.src("node_modules/jquery/dist/jquery.js")
        .pipe(gulp.dest("dist/assets/js/"));
});

//Get popper.js
gulp.task('move-popper', function () {
    gulp.src("node_modules/popper.js/dist/popper.js")
        .pipe(gulp.dest("dist/assets/js/"));
});

//Get bootstrap.js
gulp.task('move-bootstrap-js', function () {
    gulp.src("node_modules/bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest("dist/assets/js/"));
});

