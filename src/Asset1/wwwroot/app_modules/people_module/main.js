var APP_GLOBALS = APP_GLOBALS || {};
(function (angular, APP_GLOBALS) {

    'use strict';

    angular.module('test_module', ['configurables',
        [
        './app_modules/people_module/build/module_combined.js'
        ]
    ]
    );

})(angular, APP_GLOBALS);