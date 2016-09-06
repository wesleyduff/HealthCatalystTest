var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    folders = require('gulp-folders'),
    minify = require('gulp-minify'),
    order = require('gulp-order'),
    path = require('path');


var paths = {
    scripts: ['wwwroot/app_modules/**/bundle/*.js'],
    less: ['wwwroot/css/LESS/*.less'],
    folder: 'wwwroot/app_modules/'
}

gulp.task('Test', function (done) {
    var server = require('karma').Server;
    
    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('TDD', function (done) {
    var server = require('karma').Server;

    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        debug: true
    }, done).start(); 
}); 

gulp.task('less', function () {
    console.log(path.join(__dirname, 'less', 'includes'));
    return gulp.src('wwwroot/css/LESS/*.less')
    .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('wwwroot/css/dist'))
})

gulp.task('bundling', folders(paths.folder, function (folder) {
    console.log(folder);
    return gulp.src('wwwroot/app_modules/' + folder + '/bundle/*.js')
    .pipe(order([
        '*-services.js',
        '*-directives.js',
        '*-filters.js',
        '*-controllers.js',
        '*-module.js'
    ]))
    //uglify
    .pipe(concat("module_combined.js"))
    //dist
    .pipe(gulp.dest('./wwwroot/app_modules/' + folder + '/build/'))
}));

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['bundling']);
    gulp.watch(paths.less, ['less']);
});

gulp.task('optimize', folders(paths.folder, function (folder) {//optimize
       return rjs({
            baseUrl: './wwwroot/app_modules/' + folder + '/',
              name: 'main',
              out: 'module_optimized.js',
              findNestedDependencies: true
          })
     .pipe(gulp.dest('./wwwroot/app_modules/' + folder + '/build/'))
 }));



gulp.task('default', ['watch', 'bundling', 'less']);