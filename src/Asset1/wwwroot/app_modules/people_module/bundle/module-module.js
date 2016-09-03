(function (angular, APP_GLOBALS) {

    'use strict';

    angular.module('test_module')
        .filter('startsWithLetter', APP_GLOBALS.Filters.startsWithLetter)
        .filter('filterGender', APP_GLOBALS.Filters.filterGender)
        .factory('$peopleFactoryDataService', ['$shareManager', '$log', '$cacheFactory', '$http', '$q', APP_GLOBALS.PeopleServices.factory])
        .controller('MainController', ['$scope', '$peopleFactoryDataService', '$log', '$filter', APP_GLOBALS.Controllers.MainController])
    ;

})(angular, APP_GLOBALS)