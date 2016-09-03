(function (angular, APP_GLOBALS) {

    'use strict';

    angular.module('test_module')
      .controller('MainController', ['$scope', APP_GLOBALS.Controllers.MainController]);
    /*global Controllers*/

})(angular, APP_GLOBALS)