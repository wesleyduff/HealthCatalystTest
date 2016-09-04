require.config({
    baseUrl: "",
    paths: {
        'angular': 'lib/angular/angular',
        'lodash': 'lib/lodash/lodash.min',
        'ui.router': 'lib/angular-ui-router/release/angular-ui-router.min',
        'oclazyload': 'lib/oclazyload/dist/ocLazyLoad',
        'ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap.min',
        'jquery': 'lib/jquery/dist/jquery.min',
        'domReady': 'lib/vendor.requirejs/domReady',
        'bootstrapjs': 'lib/bootstrap/dist/js/bootstrap.min',
        'require': 'lib/requirejs/require',
        'serivice_config' : 'Shared/services'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'require' : {
            exports: 'require'
        },
        'oclazyload': ['angular'],
        'jquery': {
            exports: 'jQuery'
        },
        'bootstrapjs': {
            deps: ['jquery']
        },
        'lodash': {
            exports: '_'
        },
        'ui.router': ['angular'],
        'ui.bootstrap': ['angular']
    },
    deps: [
      'bootstrap'
    ]
});

require(['bootstrap']);