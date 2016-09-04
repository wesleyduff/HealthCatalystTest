// Karma configuration
// Generated on Sun Sep 04 2016 13:19:53 GMT-0500 (Central Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        waitSeconds: 200,

        // list of files / patterns to load in the browser
        files: [
            //external deps for OC.LazyLoaded Files
             './node_modules/angular/angular.js',

             //Deps for Oc.LazyLoad Testing : THAT REQUIRE ANGLUAR or someother framework to be loaded
            { pattern: 'wwwroot/app_modules/**/*.js', included: false },


             //External Deps for RequireJS files
             {
                 pattern: 'wwwroot/lib/angular/angular.js',
                 included: false
             },
              {
                  pattern: 'wwwroot/lib/angular-mocks/angular-mocks.js',
                  included: false
              },
                {
                    pattern: 'wwwroot/lib/requrie/require.js',
                    included: false
                },
              //Deps for RequireJS testing
             { pattern: 'wwwroot/Shared/services.js', included: true },
             { pattern: 'wwwroot/test/spec/**/*.js', included: false },
            './test-main.js'
        ],

        captureTimeout: 6000,


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
