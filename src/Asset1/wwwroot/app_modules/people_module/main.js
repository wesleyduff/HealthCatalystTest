(function(angular, APP){

    'use strict';

    var module = angular.module('people_module',
        [
            // ----- ANGULAR MODULES
            //this module uses these other angular modules
            'configurables',
            [
             // './app_modules/people_module/bundle/module-directives.js',
               './app_modules/people_module/bundle/module-filters.js',
               './app_modules/people_module/bundle/module-services.js',
               './app_modules/people_module/bundle/module-controllers.js',
               './app_modules/people_module/bundle/module-module.js'
            ]
        ]
    );
   

    return module;

})(angular);

   