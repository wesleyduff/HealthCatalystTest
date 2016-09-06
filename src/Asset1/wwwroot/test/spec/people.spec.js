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

                    getPeopleRequestHandler = $httpBackend.when('GET', 'http://localhost:51277/api/people')
                    .respond(
                     [
                         { "id": 1, "gender": "Female", "interests": [{ "id": 1, "activity": "Watching Movies" }, { "id": 2, "activity": "Reading" }, { "id": 3, "activity": "Swimming" }], "firstName": "louna", "lastName": "roche", "fullName": "louna roche", "address": { "id": 1, "street": "4911 esplande du 9", "city": "le mont-sur-lausanne", "state": "AK", "postalCode": "3971" }, "age": 45, "email": "louna.roche@example.com", "phone": "(619)343-2222", "picture": { "id": 1, "large": "https://randomuser.me/api/portraits/women/4.jpg", "medium": "https://randomuser.me/api/portraits/med/women/4.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/4.jpg" }, "dateCreated": "2016-09-05T19:58:46.9614787" },
                         { "id": 2, "gender": "Female", "interests": [{ "id": 4, "activity": "Volley Ball" }, { "id": 5, "activity": "Hiking" }], "firstName": "sofie", "lastName": "andersen", "fullName": "sofie andersen", "address": { "id": 2, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 27, "email": "sofie.andersen@example.com", "phone": "(632)343-3422", "picture": { "id": 2, "large": "https://randomuser.me/api/portraits/women/12.jpg", "medium": "https://randomuser.me/api/portraits/med/women/12.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/12.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" },
                         { "id": 3, "gender": "Male", "interests": [{ "id": 6, "activity": "Skiing" }, { "id": 7, "activity": "Hiking" }], "firstName": "jeremy", "lastName": "jones", "fullName": "jeremy jones", "address": { "id": 3, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 32, "email": "jeremy.jones@example.com", "phone": "(512)222-2222", "picture": { "id": 3, "large": "https://randomuser.me/api/portraits/men/63.jpg", "medium": "https://randomuser.me/api/portraits/med/men/63.jpg", "small": "https://randomuser.me/api/portraits/thumb/men/63.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" }
                     ]);

                    //var vm = $controller('MainController', {
                    //    $scope: $scope,
                    //    $peopleFactoryDataService: PeopleDataService
                    //});
                });
                it('should have poeple on scope with httpbackend', function () {
                    $httpBackend.expectGET('http://localhost:51277/api/people');
                    console.log('---service-');
                    console.dir(PeopleDataService);
                    $controller('MainController', {
                        $scope: $scope,
                        $peopleFactoryDataService: PeopleDataService
                    });
                    $httpBackend.flush();
                    console.log($scope);
                    expect($scope.people).toBeDefined();
                    expect($scope.people.length).toBe(3);
                });

                it('Should have people on scope', function () {
                    
                    deferred.resolve([
                        { "id": 1, "gender": "Female", "interests": [{ "id": 1, "activity": "Watching Movies" }, { "id": 2, "activity": "Reading" }, { "id": 3, "activity": "Swimming" }], "firstName": "louna", "lastName": "roche", "fullName": "louna roche", "address": { "id": 1, "street": "4911 esplande du 9", "city": "le mont-sur-lausanne", "state": "AK", "postalCode": "3971" }, "age": 45, "email": "louna.roche@example.com", "phone": "(619)343-2222", "picture": { "id": 1, "large": "https://randomuser.me/api/portraits/women/4.jpg", "medium": "https://randomuser.me/api/portraits/med/women/4.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/4.jpg" }, "dateCreated": "2016-09-05T19:58:46.9614787" },
                        { "id": 2, "gender": "Female", "interests": [{ "id": 4, "activity": "Volley Ball" }, { "id": 5, "activity": "Hiking" }], "firstName": "sofie", "lastName": "andersen", "fullName": "sofie andersen", "address": { "id": 2, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 27, "email": "sofie.andersen@example.com", "phone": "(632)343-3422", "picture": { "id": 2, "large": "https://randomuser.me/api/portraits/women/12.jpg", "medium": "https://randomuser.me/api/portraits/med/women/12.jpg", "small": "https://randomuser.me/api/portraits/thumb/women/12.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" },
                        { "id": 3, "gender": "Male", "interests": [{ "id": 6, "activity": "Skiing" }, { "id": 7, "activity": "Hiking" }], "firstName": "jeremy", "lastName": "jones", "fullName": "jeremy jones", "address": { "id": 3, "street": "6375 fredensvej", "city": "beder", "state": "AK", "postalCode": "95887" }, "age": 32, "email": "jeremy.jones@example.com", "phone": "(512)222-2222", "picture": { "id": 3, "large": "https://randomuser.me/api/portraits/men/63.jpg", "medium": "https://randomuser.me/api/portraits/med/men/63.jpg", "small": "https://randomuser.me/api/portraits/thumb/men/63.jpg" }, "dateCreated": "2016-09-05T19:58:46.9624794" }
                    ]);

                    // We have to call apply for this to work
                    $scope.$apply();
                    console.log('------ scope ');
                    console.dir($scope);
                    // Since we called apply, not we can perform our assertions
                    expect($scope.people).not.toBe(undefined);
                    expect($scope.people.length).toBe(3);
                });
            });



            describe(' >>> PostController', function () {

                       
            });

        });


    });