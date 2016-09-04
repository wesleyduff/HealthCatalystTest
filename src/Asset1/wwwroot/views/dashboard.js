define('dashboard', [

    'angular',
    'require',

    '../app_modules/main'

], function (angular, require, peopleModule) {

    'use strict';
    

    var module = angular.module('dashboard_module',
        [
            // ----- ANGULAR MODULES
            //this module uses these other angular modules
            'people_module'
        ]
    )
    .filter('filterGender', filters().genderFilter)
    .filter('gender', filters().startsWithLetter)
    .controller('MainController', controller)
    .factory('$peopleFactoryDataService', service);


    return module;
});