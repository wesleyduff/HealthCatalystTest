var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    folders = require('gulp-folders'),
    minify = require('gulp-minify'),
    rjs = require('gulp-requirejs');


var paths = {
    scripts: ['app/app_modules/**/bundle/*.js'],
    folder: 'app/app_modules/'
}

gulp.task('bundling', folders(paths.folder, function (folder) {
    console.log(folder);
    //return gulp.src('./app/app_modules/' + folder + '/bundle/module-module.js')

    //optimize
    return rjs({
        baseUrl: './app/app_modules/test_module/bundle/',
        name: 'module-module',
        out: 'module_combined.js',
        findNestedDependencies: true
    })
    //uglify
    //.pipe(concat("module_combined.js"))
    //dist
    .pipe(gulp.dest('./app/app_modules/' + folder + '/build/'))
}));

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['bundling']);
});



gulp.task('default', ['watch', 'bundling']);