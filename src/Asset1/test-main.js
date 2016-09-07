var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule)
    }
});

console.log(allTestFiles);

require.config({
  // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        // External libraries
        'angular': '/base/wwwroot/lib/angular/angular',
        'angularMocks': '/base/wwwroot/lib/angular-mocks/angular-mocks',
        'uiRouter': '/base/wwwroot/lib/angular-ui-router/release/angular-ui-router',
        //utils
        //'go_go_gadget' : '/base/wwwroot/app_utils',

        //'templates': '../templates'
        'people': '/base/wwwroot/app_modules'
    },

    shim: {
        'angular': { 'exports': 'angular' },
        'angularMocks': { deps: ['angular'], 'exports': 'angular.mock' },
        'uiRouter' : {deps: ['angular'], 'exports' : 'uiRouter'},
       // 'go_go_gadget': {
       //     'exports': 'go_go_gadget'
       // },

        // Each template to be included in tests should be included below.
        //‘templates/status-chart.html': {deps: ['angular']}
        '/base/wwwroot/app_modules/people_module/main': { deps: ['angular'] }
    },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
