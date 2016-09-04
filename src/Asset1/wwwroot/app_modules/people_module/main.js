//adding this for karma testing purposes
var APP = APP || {};

(function (angular, APP) {

    'use strict';

    var module = angular.module('people_module',
        [
            // ----- ANGULAR MODULES
            //this module uses these other angular modules
            'configurables'
        ]
    );
   

    return module;

})(angular, APP);

   