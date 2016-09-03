(function (angular, APP_GLOBALS) {
    'use strict';

    APP_GLOBALS.Controllers = {
        MainController: function ($scope) {

        }
    };

})(angular, APP_GLOBALS);
(function (angular, APP_GLOBALS) {

    'use strict';

    angular.module('test_module')
      .controller('MainController', ['$scope', APP_GLOBALS.Controllers.MainController]);
    /*global Controllers*/

})(angular, APP_GLOBALS)