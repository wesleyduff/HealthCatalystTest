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
                            addPerson: function (person, titleOptions, stateOptions) {

                                $log.debug('Trying Adding Person : ' + person.FirstName + ' ' + person.lastName + ' to database');

                                person.title = titleOptions.selectedOption;

                                //set gender
                                switch (person.title) {
                                    case 'Mr':
                                        person.gender = "Male"
                                        break;
                                    default:
                                        person.gender = "Female"
                                        break;
                                };

                                //set selections
                                if (!person.location) {
                                    person.location = {};
                                }
                                person.location.state = stateOptions.selectedOption.abbreviation;
                                person.title = titleOptions.selectedOption;

                                //Match ViewModel before sending and Build : Only needed for the post
                                //Would split this out to its own method if we were updating people too.
                                var passData = {
                                    FirstName: person.FirstName,
                                    LastName: person.lastName,
                                    Gender: person.gender,
                                    Email: person.email,
                                    Phone: person.phone,
                                    Age: person.age,
                                    Address: {
                                        City: person.location.city,
                                        State: person.location.state,
                                        Street: person.location.street,
                                        PostalCode: person.location.postalcode
                                    },
                                    Interests: (function () {
                                        var returnArray = [];
                                        var interests = person.interests.split(',');
                                        for (var i = 0; i < interests.length; i++) {
                                            returnArray.push({ Activity: interests[i] });
                                        }
                                        return returnArray;
                                    })(),
                                    Picture: {
                                        Large: person.largePic
                                    }
                                };
                                //make $http call
                                return $http({
                                    method: 'POST',
                                    data: JSON.stringify(passData),
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