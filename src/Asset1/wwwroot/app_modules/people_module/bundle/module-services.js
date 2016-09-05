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