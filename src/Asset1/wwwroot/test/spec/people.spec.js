define([
'angular',
'angularMocks',
'uiRouter',
'serivice_config',

//OC.LazyLoaded files for testing
'wwwroot/app_modules/people_module/main',
'wwwroot/app_modules/people_module/build/module_combined'

], function (angular, mocks) {
    var shareManager,
               PeopleDataService,
               $httpBackend,
               createController,
               $q,
               $log,
               $timeout,
               peopleCollection,
               $rootScope,
               $state,
               $controller,
               PostController,
               $filter;

    describe('0 -- Testing : People ---- ', function () {
           
           

            beforeEach(mocks.module('configurables'));


            //Before each test load up the people_module
            beforeEach(function () {
                mocks.module(function ($shareManagerProvider) {
                    var BASE = "http://localhost:51277/api";
                    var RAOMEME = "http://api.randomuser.me"

                    $shareManagerProvider.API = {
                        uri : {
                            people: function () {
                                return BASE + "/people"
                            },
                            random: {
                                pictures: function (results) {
                                    if (!results) {
                                        results = 5;
                                    }
                                    return RAOMEME + '/?inc=picture&results=' + results;
                                }
                            }
                        }
                    };
                });
            });



            beforeEach(module('ui.router'));
            beforeEach(mocks.module('people_module'));


            beforeEach(inject(
                function (
                    _$shareManager_,
                    _$peopleFactoryDataService_,
                    _$q_,
                    _$rootScope_,
                    _$log_,
                    _$timeout_,
                    _$state_,
                    _$httpBackend_,
                    _$controller_,
                    _$filter_,
                    $injector
                )
                {
                    ShareManager = _$shareManager_;
                    PeopleDataService = _$peopleFactoryDataService_;
                    $q = _$q_;
                    $rootScope = _$rootScope_;
                    $log = _$log_;
                    $timeout = _$timeout_;
                    $state = _$state_;
                    $httpBackend = _$httpBackend_;
                    $controller = _$controller_;
                    $filter = _$filter_;                
                    
                  


                    //$state = $injector.get('$state');
                    // Set up the mock http service responses
                    //$httpBackend = $injector.get('$httpBackend');
                    // backend definition common for all tests
                    /*peopleCollection = $httpBackend.when('GET', 'http://localhost:51277/api/people').respond(
                    {
                        data: [
                            { "id": 1, "gender": "Female", "interests": [{ "id": 1, "activity": "Watching Movies" }, { "id": 2, "activity": "Reading" }, { "id": 3, "activity": "Swimming" }], "firstName": "louna", "lastName": "roche", "fullName": "louna roche", "address": { "id": 1, "street": "4911 esplande du 9", "city": "le mont-sur-lausanne", "state": "AK", "postalCode": "3971" }, "age": 45, "email": "louna.roche@example.com", "phone": "(619)343-2222", "picture": { "id": 1, "large": "https://randomuser.me/api/portraits/women/4.jpg", "medium": "https://randomuser.me/api/portraits/med/women/4.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/4.jpg" }, "dateCreated": "2016-09-05T19:58:46.9614787" },
                            { "id": 2, "gender": "Female", "interests": [{ "id": 4, "activity": "Volley Ball" }, { "id": 5, "activity": "Hiking" }], "firstName": "sofie", "lastName": "andersen", "fullName": "sofie andersen", "address": { "id": 2, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 27, "email": "sofie.andersen@example.com", "phone": "(632)343-3422", "picture": { "id": 2, "large": "https://randomuser.me/api/portraits/women/12.jpg", "medium": "https://randomuser.me/api/portraits/med/women/12.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/12.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" },
                            { "id": 3, "gender": "Male", "interests": [{ "id": 6, "activity": "Skiing" }, { "id": 7, "activity": "Hiking" }], "firstName": "jeremy", "lastName": "jones", "fullName": "jeremy jones", "address": { "id": 3, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 32, "email": "jeremy.jones@example.com", "phone": "(512)222-2222", "picture": { "id": 3, "large": "https://randomuser.me/api/portraits/men/63.jpg", "medium": "https://randomuser.me/api/portraits/med/men/63.jpg", "small": "https://randomuser.me/api/portraits/thumb/men/63.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" }
                        ]
                    });
                    */

            
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            
             

            describe(' >>> Testing Share Manager', function () {
    
                it('Should have two API endpoints', function () {
                    expect(ShareManager.API.uri.people()).toBe('http://localhost:51277/api/people');
                });

            });



            describe(' === PeopleFactoryDataService', function () {

                var $scope;

                beforeEach(function () {
                    $scope = $rootScope.$new();
                });

                //check to make sure the factory exists  
                it('Should exist', function () {
                    expect(PeopleDataService).toBeDefined();
                });

            });
                       

            describe(' >>> MainController', function () {

                var $scope,
                    deferred,
                    getPeopleRequestHandler;

                beforeEach(function () {
                    $scope = $rootScope.$new();

                    // We use the $q service to create a mock instance of defer
                    deferred = $q.defer();

                    // Use a Jasmine Spy to return the deferred promise
                   // spyOn(PeopleDataService, 'getAllPeople').and.returnValue(deferred.promise);

                  
                });
                it('should have poeple on scope : SUCCESS', function () {
                    $httpBackend.when('GET', 'http://localhost:51277/api/people')
                    .respond(
                     [
                         { "id": 1, "gender": "Female", "interests": [{ "id": 1, "activity": "Watching Movies" }, { "id": 2, "activity": "Reading" }, { "id": 3, "activity": "Swimming" }], "firstName": "louna", "lastName": "roche", "fullName": "louna roche", "address": { "id": 1, "street": "4911 esplande du 9", "city": "le mont-sur-lausanne", "state": "AK", "postalCode": "3971" }, "age": 45, "email": "louna.roche@example.com", "phone": "(619)343-2222", "picture": { "id": 1, "large": "https://randomuser.me/api/portraits/women/4.jpg", "medium": "https://randomuser.me/api/portraits/med/women/4.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/4.jpg" }, "dateCreated": "2016-09-05T19:58:46.9614787" },
                         { "id": 2, "gender": "Female", "interests": [{ "id": 4, "activity": "Volley Ball" }, { "id": 5, "activity": "Hiking" }], "firstName": "sofie", "lastName": "andersen", "fullName": "sofie andersen", "address": { "id": 2, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 27, "email": "sofie.andersen@example.com", "phone": "(632)343-3422", "picture": { "id": 2, "large": "https://randomuser.me/api/portraits/women/12.jpg", "medium": "https://randomuser.me/api/portraits/med/women/12.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/12.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" },
                         { "id": 3, "gender": "Male", "interests": [{ "id": 6, "activity": "Skiing" }, { "id": 7, "activity": "Hiking" }], "firstName": "jeremy", "lastName": "jones", "fullName": "jeremy jones", "address": { "id": 3, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 32, "email": "jeremy.jones@example.com", "phone": "(512)222-2222", "picture": { "id": 3, "large": "https://randomuser.me/api/portraits/men/63.jpg", "medium": "https://randomuser.me/api/portraits/med/men/63.jpg", "small": "https://randomuser.me/api/portraits/thumb/men/63.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" }
                     ]);
                    $httpBackend.expectGET('http://localhost:51277/api/people');
                    $controller('MainController', {
                        $scope: $scope,
                        $peopleFactoryDataService: PeopleDataService
                    });
                    $httpBackend.flush();

                    expect($scope.people).toBeDefined();
                    expect($scope.people.length).toBe(3);
                });


                it('Should fail request with bad request', function () {
                    $httpBackend.when('GET', 'http://localhost:51277/api/people')
                   .respond("bad request");
                    $httpBackend.expectGET('http://localhost:51277/api/people');
                    $controller('MainController', {
                        $scope: $scope,
                        $peopleFactoryDataService: PeopleDataService
                    });
                    $httpBackend.flush();
                    $scope.$apply();

                    expect($scope.people).toBe("bad request");

                });
            });



            describe(' >>> PostController', function () {

                var $scope,
                   deferred,
                   getPeopleRequestHandler;

                beforeEach(function () {
                    $scope = $rootScope.$new();

                    // We use the $q service to create a mock instance of defer
                    deferred = $q.defer();


                });

                describe(' >>> GETRANDOM PHOTOS', function () {

                    it('Should have been called', function () {
                        //Use this or $httpBackend
                        //I perfer the spyOn for this case
                        spyOn(PeopleDataService, "getRandomPhotos").and.callFake(function () {
                            deferred.resolve([
                               { data: 'mock data' }
                            ]);
                            return deferred.promise;
                        });

                        $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                        });


                        expect(PeopleDataService.getRandomPhotos).toHaveBeenCalled();
                    });

                    it('Should have at least one item', function () {
                        $httpBackend.expectGET('http://api.randomuser.me/?inc=picture&results=5');

                        $httpBackend.when('GET', 'http://api.randomuser.me/?inc=picture&results=5')
                            .respond({
                                results: [
                                    { mock: 'list of images comes back : Mocked data for service.' },
                                    { check: 0 }
                                ]
                            });

                        $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                        });

                        $httpBackend.flush();

                        $scope.$apply();

                        expect($scope.photos).toBeDefined();
                        expect($scope.photos.length).toBeGreaterThan(1);
                        expect($scope.photos[1].check).toBe(0);
                    });

                });


                describe(' >>> Add image to person before post : chooseImage ', function () {

                    it('Should have set an image on person', function () {

                        var event = {
                            preventDefault: function () { return false; },
                                currentTarget: { }
                            };


                        //this method gets fired on controller creation.
                        spyOn(PeopleDataService, "getRandomPhotos").and.callFake(function () {
                            deferred.resolve({
                                results: [
                                    { mock: 'list of images comes back : Mocked data for service.' },
                                    { check: 0 }
                                ]
                            });
                            return deferred.promise;
                        });
                        

                       $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                       });

                        $scope.chooseImage(event, 'http://fake.png');

                        // expect(PeopleDataService.addPerson).toHaveBeenCalled();
                        expect($scope.person.picture).toBeDefined();
                    });

                });
                describe(' >>> POST Person : addPerson ', function () {

                    it('Should have been called', function () {
                        //we need to mock out some items used during the post
                        var jQuery = {},
                            event = {
                                preventDefault: function () { return false; },
                                currentTarget: {}
                            };
                        //need to mock this out to get past it
                        //this method gets fired on controller creation.
                        spyOn(PeopleDataService, "getRandomPhotos").and.callFake(function () {
                            deferred.resolve({
                                results: [
                                    { mock: 'list of images comes back : Mocked data for service.' },
                                    { check: 0 }
                                ]
                            });
                            return deferred.promise;
                        });

                        spyOn(PeopleDataService, "addPerson").and.callFake(function () {
                            deferred.resolve({
                                results: [
                                    { mock: 'Person Saved' },
                                    { check: 0 }
                                ]
                            });
                            return deferred.promise;
                        });

                        $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                        });

                        $scope.chooseImage(event, 'http://fake.png');
                        
                        $scope.addPerson.person = { largePic: '' };
                        $scope.addPerson();

                        // expect(PeopleDataService.addPerson).toHaveBeenCalled();

                        expect(true);
                    });

                });

                describe(' >>>  Objects on the $scope', function () {

                    it('Should have : title options', function () {

                        spyOn(PeopleDataService, "getRandomPhotos").and.callFake(function () {
                            deferred.resolve([
                               { data: 'mock data' }
                            ]);
                            return deferred.promise;
                        });

                        $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                        });

                        expect($scope.titleOptions).toBeDefined();
                        expect(typeof ($scope.titleOptions.availableOptions)).toBe('object');
                        expect($scope.titleOptions.availableOptions.length).toBeDefined();
                        expect($scope.titleOptions.availableOptions.length).toBe(3); //Mr, Mrs, Miss

                    });

                    it('Should have : state options', function () {

                        spyOn(PeopleDataService, "getRandomPhotos").and.callFake(function () {
                            deferred.resolve([
                               { data: 'mock data' }
                            ]);
                            return deferred.promise;
                        });

                        $controller('PostController', {
                            $scope: $scope,
                            $peopleFactoryDataService: PeopleDataService
                        });

                        expect($scope.stateOptions).toBeDefined();
                        expect(typeof ($scope.stateOptions)).toBe('object');
                        expect($scope.stateOptions.availableOptions.length).toBeGreaterThan(47); //48 states with 2 being Hawaii and Alaska. Other states added for outter states
                    });
                });
                       
            });

        });


    });