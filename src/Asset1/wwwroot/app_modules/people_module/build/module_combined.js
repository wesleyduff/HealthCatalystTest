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
                         * Could use ngResource : $resource here, but I like to 
                         * have more controll over my Calls to the server.
                         * ------------------------------
                         *          API METHODS 
                         * ------------------------------
                         * getAllPeople
                         * <params></params>
                         * ---
                         * addPeople
                         * <params>person</params>
                         * -----------------------------
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
                            },
                            addPerson: function (person) {

                                $log.debug('Adding Person : ' + person.firstName + ' ' + person.lastName + ' to database');

                                //make $http call
                                return $http({
                                    method: 'POST',
                                    data: person,
                                    url: API.uri.people()
                                })
                                .then(sendResponseData)
                                .catch(sendCatchResponseData)
                               
                            }
                        };

                        function sendResponseData(response) {
                            //add response to the cache
                            //less trips to the server
                            var peopleCollectionFromCache = dataCache.get('peopleCollection');

                            if (peopleCollectionFromCache) {
                                // --- Update the cached collection
                                peopleCollectionFromCache.push(response.data);
                                dataCache.put('peopleCollection', peopleCollectionFromCache);
                            }

                            switch (response.config.method) {
                                case 'GET':
                                    return response.data;
                                    break;
                                case 'POST':
                                    //TODO: Make sure response is what we need : Should be a person object
                                    return { collection: peopleCollectionFromCache, personSaved: response.data }
                                    break;
                            }

                            
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
                '$timeout',
                function ($scope, $peopleFactoryDataService, $log, $filter, $timeout) {
                    /* -------------------------------------- */
                    /* ---------- RESPONSE Methods ---------- */
                    /* -------------------------------------- */
                    var peopleMethods = {
                        getAllPeople: {
                            success: function (collection) {

                                /* ---------------------------------------------------------- */
                                /* -------------- SIMULATE 5 seconds of Slowness -------------*/
                                /* ---------------------------------------------------------- */
                                $log.debug('Simulating slowness for 5 seconds');
                                peopleMethods.utils.simulateSlowness(function () {

                                    /* ---------------------------------------------------------- */
                                    /* -------------- Setup Scope Objects to bind to the UI -------------*/
                                    /* ---------------------------------------------------------- */
                                    $scope.people = collection;
                                    $scope.man = $filter('filterGender')(collection, "Male");
                                    $scope.women = $filter('filterGender')(collection, "Female");
                                    //Turn OFF Loader
                                    peopleMethods.utils.ToggleLoader('off');
                                }, 500);

                                

                            },
                            notification: function (notification) {
                                $log.debug(notification);
                            },
                            complete: function (complete) {

                                $log.debug(complete);
                            }
                        },
                        errorCallBack: function () {

                            //Turn OFF Loader
                            peopleMethods.utils.ToggleLoader('off');

                            //show error and log error
                            peopleMethods.showError('xxx---xxx-- Error while calling getAllPeople');

                        },
                        utils: {
                            ToggleLoader : function(val) {
                                $scope.$emit('toggleLoader', val);
                            },
                            simulateSlowness : function(callback, secondsToWait) {
                                $timeout(callback, secondsToWait);
                            },
                            showError: function (message) {
                                //maybe put something on the UI to show a message to the user of what has happened.
                                //for now we will just log out to the console
                                $log.deug(message)
                            }
                        }
                    }

                    // Start the loader
                    peopleMethods.utils.ToggleLoader('on');
                   

                    /* -------------------------------------- */
                    /* ---------- MAIN init data ------------ */
                    /* -------------------------------------- */
                    $peopleFactoryDataService.getAllPeople()
                    .then(peopleMethods.getAllPeople.success, null, peopleMethods.getAllPeople.notification('Notify of : getAllPeople'))
                    .catch(peopleMethods.errorCallBack)
                    .finally(peopleMethods.getAllPeople.complete('Complete'));
                }
            ],
            PostController: [
                '$scope',
                '$peopleFactoryDataService',
                '$log',
                '$state',
                '$timeout',
                function ($scope, $peopleFactoryDataService, $log, $state, $timeout){

                    var peopleAddMethods = {
                        addPeople: {
                            success: function (response) {
                                
                                /* ---------------------------------------------------------- */
                                /* -------------- HANDLE POST : SUCCESS RESPONSE -------------*/
                                /* ---------------------------------------------------------- */
                                
                            },
                            notification: function (notification) {
                                $log.debug(notification);
                            },
                            complete: function (complete) {

                                // --- Redirect the user back to the dashboard
                                /* ---------------------------------------------------------- */
                                /* -------------- SIMULATE 5 seconds of Slowness -------------*/
                                /* ---------------------------------------------------------- */
                                $log.debug('Simulating slowness for 5 seconds');
                                peopleMethods.utils.simulateSlowness(function () {

                                    //--Turn OFF Loader
                                    peopleMethods.utils.ToggleLoader('off');

                                    //-- redirect to dashboard
                                    $state.go('dashboard');

                                }, 5000);
                                
                                $log.debug(complete);
                            }
                        },
                        errorCallBack: function () {
                            //Turn OFF Loader
                            peopleMethods.utils.ToggleLoader('off');
                            $log.debug('xxx---xxx-- Error while calling getAllPeople');
                        },
                        utils: {
                            ToggleLoader: function (val) {
                                $scope.$emit('toggleLoader', val);
                            },
                            simulateSlowness: function (callback, secondsToWait) {
                                $timeout(callback, secondsToWait);
                            },
                            showError: function (message) {
                                //maybe put something on the UI to show a message to the user of what has happened.
                                //for now we will just log out to the console
                                $log.deug(message)
                            }
                        }
                    }

                    // Start the loader
                    peopleAddMethods.utils.ToggleLoader('off');


                    /* -------------------------------------- */
                    /* ---------- MAIN init data ------------ */
                    /* -------------------------------------- */
                    $scope.addPerson = function () {
                        $peopleFactoryDataService.addPerson(this.person)
                            .then(peopleMethods.getAllPeople.success, null, peopleMethods.getAllPeople.notification('Notify of : getAllPeople'))
                            .catch(peopleMethods.errorCallBack)
                            .finally(peopleMethods.getAllPeople.complete('Complete'));
                    };


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
        .controller('PostController', APP.PeopleControllers().PostController)
        .factory('$peopleFactoryDataService', APP.PeopleServices().PeopleFactoryDataService);

    return module;

})(angular, APP);