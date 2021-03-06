﻿require.config({
    baseUrl: "",
    paths: {
        'angular': 'lib/angular/angular',
        'angularSpinners' : 'lib/angular-spinners/angular-spinners.min',
        'lodash': 'lib/lodash/lodash.min',
        'ui.router': 'lib/angular-ui-router/release/angular-ui-router.min',
        'oclazyload': 'lib/oclazyload/dist/ocLazyLoad',
        'ui.bootstrap': 'lib/angular-bootstrap/ui-bootstrap.min',
        'jquery': 'lib/jquery/dist/jquery.min',
        'domReady': 'lib/vendor.requirejs/domReady',
        'bootstrapjs': 'lib/bootstrap/dist/js/bootstrap.min',
        'require': 'lib/requirejs/require',
        'serivice_config': 'Shared/services',

        //utils
        'go_go_gadget' : 'app_utils'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angularSpinners' : {
            deps: ['angular']
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
        'ui.bootstrap': ['angular'],
        'go_go_gadget': {
            exports: 'go_go_gadget'
        }
    },
    deps: [
      'bootstrap'
    ]
});

require(['bootstrap']);