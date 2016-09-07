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
                            GO_GO_GADGET = $shareManager.get_GO_GO_GADGET(),
                            dataCache = $cacheFactory.get('PeoplesCacheData');

                        //check for cached people collection
                        if (!dataCache) {
                            //create the cache object
                            $log.debug('Created cache');
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
                         * getRandomPhotos
                         * <params>(OPTIONAL) Number of results you want back</params>
                         * -- If no argument is provided then 5 results will be returned
                         */
                        return {
                            //Get some random images to choose from.
                            //creating a file upload system and handling image cropping etc.. is beyond scope.
                            getRandomPhotos: function(numberOfResultsRequested){
                                return $http({
                                    method: 'GET',
                                    url: API.uri.random.pictures(numberOfResultsRequested)
                                })
                                .then(sendRandomPhotosResponse)
                                .catch(sendCatchRandomPhotosResponse)
                            },
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
                            addPerson: function (person, title, state) {

                                $log.debug('Trying Adding Person : ' + person.FirstName + ' ' + person.lastName + ' to database');

                                /* Calling composer to build our personViewModel 
                                 * -------------------------------------------
                                 * ----  PARMS   --
                                 * --------------------------------------------
                                 * 
                                    //  -- [ _person ] : Object
                                    //  -- [ state ]: String   //  ---- EXAMPLE : TX
                                    //  -- [ title ] : string  //  ---- EXAMPLE : Mr, Mrs, Miss
                                 */
                                var PersonViewModel = GO_GO_GADGET.Compose.PersonViewModel(person, state, title);

                                //make $http call
                                return $http({
                                    method: 'POST',
                                    data: JSON.stringify(PersonViewModel),
                                    url: API.uri.people(),
                                    headers: { 'Content-Type': 'application/json' }
                                })
                                .then(sendResponseData)
                                .catch(sendCatchResponseData)
                               
                            }
                        };






                        /* ----------------------------------------------------------------
                         * ---------      HANDLE RANDOMME.API Pictures Response     -------
                         * ----------------------------------------------------------------
                         * --- Will get back 5 if an argument is not provided
                        */
                        function sendRandomPhotosResponse(response) {
                            return response.data;
                        }

                        function sendCatchRandomPhotosResponse(response) {
                            return $q.reject('Error: ' + response.status);
                        }





                        /* ----------------------------------------------------------------
                         * ---------      HANDLE People API Responses               -------
                         * ----------------------------------------------------------------
                         * ---
                        */
                        function sendResponseData(response) {
                            //add response to the cache
                            //less trips to the server
                            var peopleCollectionFromCache = dataCache.get('peopleCollection');

                            if (peopleCollectionFromCache) {
                                // --- Update the cached collection
                                $log.debug('adding person to the cached array');
                                peopleCollectionFromCache.push(response.data);
                                dataCache.put('peopleCollection', peopleCollectionFromCache);
                            }

                            switch (response.config.method) {
                                case 'GET':
                                    if (peopleCollectionFromCache) {
                                        $log.degub('returning cached object');
                                        return peopleCollectionFromCache;
                                    }
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