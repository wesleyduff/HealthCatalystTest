(function (angular, APP) {

    'use strict';

    var module = angular.module('people_module')
        .filter('filterGender', APP.PeopleFilters().genderFilter)
        .filter('startsWithLetter', APP.PeopleFilters().startsWithLetter)
        .controller('MainController', APP.PeopleControllers().MainController)
        .controller('PostController', APP.PeopleControllers().PostController)
        .factory('$peopleFactoryDataService', APP.PeopleServices().PeopleFactoryDataService);

    return module;

})(angular, APP);