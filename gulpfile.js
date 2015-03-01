'use strict';


var gulp = require('gulp'),
    concat = require('gulp-concat-css'),
    minify = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    karma = require('gulp-karma'),
    Dgeni = require('dgeni'),
    del = require('del'),
    bower = require('bower');

var testFiles = [
    'bower_components/angular/angular.min.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'app/js/*.js',
    'test/*.js'
];

gulp.task('test', function() {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('assets', ['bower'], function() {
    return gulp.src('bower_components/**/*')
        .pipe(gulp.dest('build/lib'));
});

gulp.task('bower', function() {
    var bowerTask = bower.commands.install();
    bowerTask.on('log', function (result) {
        console.log('bower:', result.id, result.data.endpoint.name);
    });
    bowerTask.on('error', function(error) {
        console.log(error);
    });
    return bowerTask;
});

gulp.task('assets', ['bower'], function() {
    return gulp.src('bower_components/**/*')
        .pipe(gulp.dest('build/lib'));
});

gulp.task('dgeni', function() {
    try {
        var dgeni = new Dgeni([require('./docs/dgeni-conf')]);
        return dgeni.generate();
    } catch(x) {
        console.log(x.stack);
        throw x;
    }
});

gulp.task('connect',function(){
    connect.server({
        root:'app',
        livereload: true
    });
});

gulp.task('css',function(){
    gulp.src('app/css/*.css')
        .pipe(concat('vendor.css'))
        .pipe(minify())
        .pipe(gulp.dest('app/style/'))
        .pipe(connect.reload());
});

gulp.task('html',function(){
    gulp.src('app/index.html')
        .pipe(connect.reload());
});

gulp.task('watch',function(){
    gulp.watch('app/css/*.css',['css']);
    gulp.watch('app/index.html',['html']);
    gulp.watch('app/scripts/*.js',['js','dgeni']);
    gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
    gulp.watch(['docs/**/*', 'src/**/*'], ['clean'])
})

gulp.task('clean', function(done) {
    del(['./build'], done);
});

gulp.task("js", function () {
    return gulp.src("app/scripts/*.js")
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(gulp.dest("app/js/"));
});

gulp.task('default',['connect', 'html', 'js','css', 'watch','test','clean','dgeni']);
