(function (APP) {

    'use strict';

    APP.PeopleServices = function () {
        return {
            PeopleFactoryDataService:
                [
                    '$shareManager',
                    '$log',
                    '$cacheFactory',
                    '$http',
                    '$q',
                    function ($shareManager, $log, $cacheFactory, $http, $q) {
                        var API = $shareManager.getAPI(),
                            dataCache = $cacheFactory.get('PeoplesCacheData');

                        $log.debug('--- in people services');
                        $log.debug('>> API : ' + $shareManager.API.uri.people());

                        //check for cached people collection
                        if (!dataCache) {
                            //create the cache object
                            dataCache = $cacheFactory('PeoplesCacheData');
                        }


                        /*
                         * API Calls
                         * -----------------
                         * Gather API Endpoints
                         */
                        return {
                            //Get a JSON object : Array of people objects
                            getAllPeople: function () {
                                var peopleCollectionFromCache = dataCache.get('peopleCollection');

                                if (peopleCollectionFromCache) {
                                    $log.debug('Returning people collection from Cache');
                                    return $q.resolve(peopleCollectionFromCache);
                                }


                                return $http({
                                    method: 'GET',
                                    url: API.uri.people()
                                })
                                .then(sendResponseData)
                                .catch(sendCatchResponseData)
                            }
                        };

                        function sendResponseData(response) {
                            //add response to the cache
                            //less trips to the server
                            dataCache.put('peopleCollection', response);

                            return response.data;
                        };

                        function sendCatchResponseData(response) {
                            return $q.reject('Error: ' + response.status);
                        }
                    }
                ]
        };
    };

    return APP.PeopleServices;
})(APP);
(function (APP) {

    'use strict';

    APP.PeopleFilters = function () {
        return {
            genderFilter: function () {
                return function (items, gender) {
                    var filtered = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.gender === gender) {
                            filtered.push(item);
                        }
                    }

                    return filtered;
                }
            },
            startsWithLetter: function () {
                return function (items, letter) {
                    if (!letter) {
                        return items;
                    }
                    var filtered = [];
                    var letterMatch = new RegExp(letter, 'i');
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (letterMatch.test(item.firstName) || letterMatch.test(item.lastName) || letterMatch.test(item.fullName)) {
                            filtered.push(item);
                        }
                    }
                    return filtered;
                };
            }
        }
    }

    return APP.PeopleFilters;
})(APP);
(function (APP) {

    'use strict';

    APP.PeopleControllers = function () {
        return {
            MainController: [
                '$scope',
                '$peopleFactoryDataService',
                '$log',
                '$filter',
                function ($scope, $peopleFactoryDataService, $log, $filter) {
                    /* -------------------------------------- */
                    /* ---------- RESPONSE Methods ---------- */
                    /* -------------------------------------- */
                    var peopleMethods = {
                        getAllPeople: {
                            success: function (collection) {
                                $scope.people = collection;
                                $scope.man = $filter('filterGender')(collection, "Male");
                                $scope.women = $filter('filterGender')(collection, "Female");;

                            },
                            notification: function (notification) {
                                $log.debug(notification);
                            },
                            complete: function (complete) {
                                $log.debug(complete);
                            }
                        },
                        errorCallBack: function () {
                            $log.debug('xxx---xxx-- Error while calling getAllPeople');
                        }
                    }



                    /* -------------------------------------- */
                    /* ---------- MAIN init data ------------ */
                    /* -------------------------------------- */
                    $peopleFactoryDataService.getAllPeople()
                    .then(peopleMethods.getAllPeople.success, null, peopleMethods.getAllPeople.notification('Notify of : getAllPeople'))
                    .catch(peopleMethods.errorCallBack)
                    .finally(peopleMethods.getAllPeople.complete('Complete'));
                }
            ]
        }
    }

    return APP.PeopleControllers;
})(APP);
(function (angular, APP) {

    'use strict';

    var module = angular.module('people_module')
        .filter('filterGender', APP.PeopleFilters().genderFilter)
        .filter('startsWithLetter', APP.PeopleFilters().startsWithLetter)
        .controller('MainController', APP.PeopleControllers().MainController)
        .factory('$peopleFactoryDataService', APP.PeopleServices().PeopleFactoryDataService);

    return module;

})(angular, APP);