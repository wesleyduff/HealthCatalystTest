describe('0 -- Testing : People ---- ', function () {
   

    describe('>>> Testing ----- Services', function () {
        var shareManager,
            PeopleDataService;


        beforeEach(angular.mock.module('configurables'));


        //Before each test load up the people_module
        beforeEach(function () {
            module(function ($shareManagerProvider) {
                var BASE = "http://localhost:51277/api";
                $shareManagerProvider.API = {
                    uri: {
                        people: function () {
                            return BASE + "/people"
                        }
                    }
                }
            });
        });

        

        describe(' === PeopleFactoryDataService', function () {
           
            

            


            beforeEach(angular.mock.module('people_module'));


            //Befre each test set our injected PeopleFactoryDataService (_$peopleFactoryDataService_) to our local variable
            beforeEach(inject(function (_$shareManager_, _$peopleFactoryDataService_) {
                PeopleDataService = _$peopleFactoryDataService_;
                ShareManager = _$shareManager_;
            }));


            //check to make sure the factory exists
            it('Should exist', function () {
                expect(PeopleDataService).toBeDefined();
            });


        });


    });


});