define([
'go_go_gadget'

], function (GO_GO_GADGET) {
    
    describe(' ---- TESTING : Utilities Library : GO_GO_GADGET ', function () {

        describe(' >>>>> TESTING BUILDER ------', function () {

            it('Should be defined', function () {
                expect(GO_GO_GADGET.Builder).toBeDefined();
            });

            it('Should build and return  |  an address', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Address(
                    {
                        city: 'test',
                        street: '123 test',
                        postalcode: '89333'
                    },
                    'TX'
                );


                //Act
                var expected = _address = {
                    City: 'test',
                    State: 'TX',
                    Street: '123 test',
                    PostalCode: '89333'
                };
                //Assert
                expect(actual).toEqual(expected);

            });

            it('Should build and return  |  an address  |  Without Params', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Address();


                //Act
                var expected = {
                    City: undefined,
                    State: 'TX',
                    Street: undefined,
                    PostalCode: undefined
                };
                //Assert
                expect(actual).toEqual(expected);

            });



            it('Should build and return  |  a gender for Male', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Gender('Mr');

                //Act
                var expected = "Male";

                //Assert
                expect(actual).toEqual(expected);

            });

            it('Should build and return  |  a gender for Female', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Gender('Mrs');
                var actual2 = GO_GO_GADGET.Builder.Gender('Miss');

                //Act
                var expected = "Female";

                //Assert
                expect(actual).toEqual(expected);
                expect(actual2).toEqual(expected);

            });

            it('Should build and return  |  a gender for Female    |  WITHOUT PARAMS', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Gender();

                //Act
                var expected = "Female";

                //Assert
                expect(actual).toEqual(expected);

            });



            it('Should build and return  |  an array of interests  |  SINGLE for empty USER input', function () {
                //Arrange

                var actual = GO_GO_GADGET.Builder.Interests();

                //Act
                var expected = [{Activity: 'I currently do not have any interests.'}];

                //Assert
                expect(actual.length).toBe(1);
                expect(actual[0]).toEqual(expected[0]);

            });

            it('Should build and return  |  an array of interests  |  Many ', function () {
                //Arrange

                var actual = GO_GO_GADGET.Builder.Interests("Hiking, Biking");

                //Act
                var expected = [{ Activity: "Hiking" }, { Activity: "Biking" }];

                //Assert
                expect(actual.length).toBe(2);
                expect(actual[0]).toEqual(expected[0]);
                expect(actual[1]).toEqual(expected[1]);

            });

            it('Should build and return  |  an array of interests  |  SINGLE [ Provided by User ] ', function () {
                //Arrange

                var actual = GO_GO_GADGET.Builder.Interests("Hiking");

                //Act
                var expected = [{ Activity: "Hiking" }];

                //Assert
                expect(actual.length).toBe(1);
                expect(actual[0]).toEqual(expected[0]);

            });


            it('Should build and return  |  a picture', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Picture('http://fake.png', 'Female');

                //Act
                var expected = {
                    Large: 'http://fake.png'
                }

                //Assert
                expect(actual).toEqual(expected);

            });

            it('Should build and return  |  a picture | PIC UNDEFINED w/ gender', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Picture('', 'Man');


                //Act
                var expected = { Large: '/img/man.png' };

                //Assert
                expect(actual).toEqual(expected);

            });

            it('Should build and return  |  a picture | Wrong param  |  NOT A PICTURE', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Picture('foo');


                //Act
                var expected = { Large: '/img/man.png' };

                //Assert
                expect(actual).toEqual(expected);

            });

            it('Should build and return  |  a picture | PIC UNDEFINED & GENDER UNDEFINED', function () {
                //Arrange
                var actual = GO_GO_GADGET.Builder.Picture();

                //Act
                var expected = { Large: '/img/man.png' };

                //Assert
                expect(actual).toEqual(expected);

            });

        });

        describe(' >>>>> TESTING COMPOSER ------', function () {

            it('Should build and return  |  a PersonViewModel  |  Parameters Undefined EXECPT FOR PERSON', function () {
                //Arrange

                //-- Builder for addresses 
                // ------------------------
                // --    PARAMS    --------
                //  -- [ _person ] : Object
                //  -- [ state ]: String   //  ---- EXAMPLE : TX
                //  -- [ title ] : string  //  ---- EXAMPLE : Mr, Mrs, Miss
                // ------------------------------------
                var actual = GO_GO_GADGET.Compose.PersonViewModel(
                    {
                        firstName: 'test',
                        lastName: 'test',
                        gender: 'Male',
                        email: 'test@test.com',
                        phone: '444-4444',
                        age: '32'
                    });


                //Act
                var expected = {
                    Title: 'Mr',
                    FirstName: 'test',
                    LastName: 'test',
                    Gender: 'Male',
                    Email: 'test@test.com',
                    Phone: '444-4444',
                    Age: '32',
                    Address: {
                        City: undefined,
                        State: 'TX',
                        Street: undefined,
                        PostalCode: undefined
                    },
                    Interests:[{Activity: 'I currently do not have any interests.'}],
                    Picture: { Large: '/img/man.png' }
                };
                //Assert
                expect(actual).toEqual(expected);

            });


            it('Should build and return  |  a PersonViewModel  |  Parameters DEFINED', function () {
                //Arrange

                //-- Builder for addresses 
                // ------------------------
                // --    PARAMS    --------
                //  -- [ _person ] : Object
                //  -- [ state ]: String   //  ---- EXAMPLE : TX
                //  -- [ title ] : string  //  ---- EXAMPLE : Mr, Mrs, Miss
                // ------------------------------------
                var actual = GO_GO_GADGET.Compose.PersonViewModel(
                    {
                        firstName: 'test',
                        lastName: 'test',
                        email: 'test@test.com',
                        phone: '444-4444',
                        age: '32',
                        location : {
                            city: 'test',
                            street: 'test',
                            postalcode: 'test'
                        },
                        interests: "Hiking, Biking"
                    }, 'TX', 'Mrs');


                //Act
                var expected = {
                    Title: 'Mrs',
                    FirstName: 'test',
                    LastName: 'test',
                    Gender: 'Female',
                    Email: 'test@test.com',
                    Phone: '444-4444',
                    Age: '32',
                    Address: {
                        City: 'test',
                        State: 'TX',
                        Street: 'test',
                        PostalCode: 'test'
                    },
                    Interests: [{ Activity: 'Hiking'}, { Activity: 'Biking'}],
                    Picture: { Large: '/img/woman.png' }
                };
                //Assert
                expect(actual).toEqual(expected);

            });

        });

    });



});