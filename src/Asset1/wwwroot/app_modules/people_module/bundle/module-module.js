(function (angular, APP_GLOBALS) {

    'use strict';

    angular.module('test_module')
        .factory('$peopleFactoryDataService', ['$shareManager', '$log', '$cacheFactory', '$http', '$q', APP_GLOBALS.PeopleServices.factory])
        .controller('MainController', ['$scope', '$peopleFactoryDataService', '$log', APP_GLOBALS.Controllers.MainController])
    ;

})(angular, APP_GLOBALS)