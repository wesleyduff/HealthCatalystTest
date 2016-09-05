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

                    $scope.photos = [];
                    var person = {};

                    var peopleAddMethods = {
                        addPeople: {
                            success: function (response) {
                                
                                /* ---------------------------------------------------------- */
                                /* -------------- HANDLE POST : SUCCESS RESPONSE -------------*/
                                /* ---------------------------------------------------------- */



                                // --- Redirect the user back to the dashboard
                                /* ---------------------------------------------------------- */
                                /* -------------- SIMULATE 5 seconds of Slowness -------------*/
                                /* ---------------------------------------------------------- */
                                $log.debug('Simulating slowness for 5 seconds');
                                peopleAddMethods.utils.simulateSlowness(function () {

                                    //--Turn OFF Loader
                                    peopleAddMethods.utils.ToggleLoader('off');

                                    //-- redirect to dashboard
                                    $state.go('dashboard');

                                }, 5000);

                            },
                            notification: function (notification) {
                                $log.debug(notification);
                            },
                            complete: function (complete) {

                               
                                $log.debug(complete);
                            }
                        },
                        getPhotos: {
                            successs: function (response) {

                                //-- ADD PHOTOS to the scope
                                $scope.photos = response.results;
                            },
                            notification: function(notification){},
                            complete: function (complete) {
                               
                                //--Turn OFF Loader
                                peopleAddMethods.utils.ToggleLoader('off');

                                $log.debug(complete);
                            }
                        },
                        errorCallBack: function () {
                            //Turn OFF Loader
                            peopleAddMethods.utils.ToggleLoader('off');
                            $log.debug('xxx---xxx-- Error adding a person to the database......');
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


                    /* ------------------------------------------------------------
                    * ---------      Get Photos for selection               -------
                    * -------------------------------------------------------------
                    * --- Handling a file upload for photos 
                    * --- / analizing photo / cropping - Editing photo 
                    * --- this should be done but that is out of scope for now
                    */
                    $peopleFactoryDataService.getRandomPhotos()
                        .then(peopleAddMethods.getPhotos.successs, null, peopleAddMethods.getPhotos.notification("Getting Photos from RandomMe.API"))
                        .catch(peopleAddMethods.errorCallBack)
                        .finally(peopleAddMethods.getPhotos.complete("Photos has been pulled down from server"));
                   

                    //-- Collections
                    var titles = ['Mr', 'Mrs', 'Miss'],
                        states = [
                            {
                                "name": "Alabama",
                                "abbreviation": "AL"
                            },
                            {
                                "name": "Alaska",
                                "abbreviation": "AK"
                            },
                            {
                                "name": "American Samoa",
                                "abbreviation": "AS"
                            },
                            {
                                "name": "Arizona",
                                "abbreviation": "AZ"
                            },
                            {
                                "name": "Arkansas",
                                "abbreviation": "AR"
                            },
                            {
                                "name": "California",
                                "abbreviation": "CA"
                            },
                            {
                                "name": "Colorado",
                                "abbreviation": "CO"
                            },
                            {
                                "name": "Connecticut",
                                "abbreviation": "CT"
                            },
                            {
                                "name": "Delaware",
                                "abbreviation": "DE"
                            },
                            {
                                "name": "District Of Columbia",
                                "abbreviation": "DC"
                            },
                            {
                                "name": "Federated States Of Micronesia",
                                "abbreviation": "FM"
                            },
                            {
                                "name": "Florida",
                                "abbreviation": "FL"
                            },
                            {
                                "name": "Georgia",
                                "abbreviation": "GA"
                            },
                            {
                                "name": "Guam",
                                "abbreviation": "GU"
                            },
                            {
                                "name": "Hawaii",
                                "abbreviation": "HI"
                            },
                            {
                                "name": "Idaho",
                                "abbreviation": "ID"
                            },
                            {
                                "name": "Illinois",
                                "abbreviation": "IL"
                            },
                            {
                                "name": "Indiana",
                                "abbreviation": "IN"
                            },
                            {
                                "name": "Iowa",
                                "abbreviation": "IA"
                            },
                            {
                                "name": "Kansas",
                                "abbreviation": "KS"
                            },
                            {
                                "name": "Kentucky",
                                "abbreviation": "KY"
                            },
                            {
                                "name": "Louisiana",
                                "abbreviation": "LA"
                            },
                            {
                                "name": "Maine",
                                "abbreviation": "ME"
                            },
                            {
                                "name": "Marshall Islands",
                                "abbreviation": "MH"
                            },
                            {
                                "name": "Maryland",
                                "abbreviation": "MD"
                            },
                            {
                                "name": "Massachusetts",
                                "abbreviation": "MA"
                            },
                            {
                                "name": "Michigan",
                                "abbreviation": "MI"
                            },
                            {
                                "name": "Minnesota",
                                "abbreviation": "MN"
                            },
                            {
                                "name": "Mississippi",
                                "abbreviation": "MS"
                            },
                            {
                                "name": "Missouri",
                                "abbreviation": "MO"
                            },
                            {
                                "name": "Montana",
                                "abbreviation": "MT"
                            },
                            {
                                "name": "Nebraska",
                                "abbreviation": "NE"
                            },
                            {
                                "name": "Nevada",
                                "abbreviation": "NV"
                            },
                            {
                                "name": "New Hampshire",
                                "abbreviation": "NH"
                            },
                            {
                                "name": "New Jersey",
                                "abbreviation": "NJ"
                            },
                            {
                                "name": "New Mexico",
                                "abbreviation": "NM"
                            },
                            {
                                "name": "New York",
                                "abbreviation": "NY"
                            },
                            {
                                "name": "North Carolina",
                                "abbreviation": "NC"
                            },
                            {
                                "name": "North Dakota",
                                "abbreviation": "ND"
                            },
                            {
                                "name": "Northern Mariana Islands",
                                "abbreviation": "MP"
                            },
                            {
                                "name": "Ohio",
                                "abbreviation": "OH"
                            },
                            {
                                "name": "Oklahoma",
                                "abbreviation": "OK"
                            },
                            {
                                "name": "Oregon",
                                "abbreviation": "OR"
                            },
                            {
                                "name": "Palau",
                                "abbreviation": "PW"
                            },
                            {
                                "name": "Pennsylvania",
                                "abbreviation": "PA"
                            },
                            {
                                "name": "Puerto Rico",
                                "abbreviation": "PR"
                            },
                            {
                                "name": "Rhode Island",
                                "abbreviation": "RI"
                            },
                            {
                                "name": "South Carolina",
                                "abbreviation": "SC"
                            },
                            {
                                "name": "South Dakota",
                                "abbreviation": "SD"
                            },
                            {
                                "name": "Tennessee",
                                "abbreviation": "TN"
                            },
                            {
                                "name": "Texas",
                                "abbreviation": "TX"
                            },
                            {
                                "name": "Utah",
                                "abbreviation": "UT"
                            },
                            {
                                "name": "Vermont",
                                "abbreviation": "VT"
                            },
                            {
                                "name": "Virgin Islands",
                                "abbreviation": "VI"
                            },
                            {
                                "name": "Virginia",
                                "abbreviation": "VA"
                            },
                            {
                                "name": "Washington",
                                "abbreviation": "WA"
                            },
                            {
                                "name": "West Virginia",
                                "abbreviation": "WV"
                            },
                            {
                                "name": "Wisconsin",
                                "abbreviation": "WI"
                            },
                            {
                                "name": "Wyoming",
                                "abbreviation": "WY"
                            }
                        ]

                    //--Titles selection group and selection
                    $scope.titleOptions = {
                        availableOptions: titles,
                        selectedOption: titles[0]
                    };
                    //--States selection group and selection
                    $scope.stateOptions = {
                        availableOptions: states,
                        selectedOption: states[0]
                    }

                    /* -------------------------------------- */
                    /* ---------- MAIN init data ------------ */
                    /* -------------------------------------- */
                    $scope.addPerson = function () {
                        peopleAddMethods.utils.ToggleLoader('on');
                        //add the picture to the person "this" object
                        this.person.largePic = person.picture;

                        //Add the person to the DB
                        $peopleFactoryDataService.addPerson(this.person, $scope.titleOptions, $scope.stateOptions)
                            .then(peopleAddMethods.addPeople.success, null, peopleAddMethods.addPeople.notification('Notify of : getAllPeople'))
                            .catch(peopleAddMethods.errorCallBack)
                            .finally(peopleAddMethods.addPeople.complete('Complete'));
                    };


                    /* -------------------------------------
                     * ---          NG CLICKS         ------
                     * -------------------------------------
                     */
                    $scope.chooseImage = function (event, pictureURI) {

                        //remove any active elements
                        jQuery('.panel .active').removeClass('active');

                        //add active class
                        angular.element(event.currentTarget).addClass('active');

                        event.preventDefault();

                        person.picture = pictureURI;
                    }

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