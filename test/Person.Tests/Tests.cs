using System;
using Xunit;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Asset1.Business.Directors.PeopleDirector;
using Asset1.PlatformClient.PeopleClient;
using Moq;
using System.Collections;
using System.Collections.Generic;
using Asset1.Business.Builders.PeopleBuilder;
using System.Threading.Tasks;

namespace Tests
{
    public class PersonTests
    {

        [Fact]
        public void PersonRepositoryGetPeopleShouldReturnAnEmptyIEnumerable()
        {
            //arrange
            var mock = new Mock<IPersonRepository>();
            mock.Setup(framework => framework.GetPeople())
                .Returns(new List<Person>() { });

            IPersonRepository repository = mock.Object;
            IEnumerable<Person> people = repository.GetPeople();

            //act
            IEnumerable<Person> result = new List<Person>() { };

            //assert
            Assert.Equal(result, people);
        }

        [Fact]
        public void PersonRepoShouldReturnAnIEnumerableOfPersonObjects()
        {
            //arrange
            var mock = new Mock<IPersonRepository>();
            mock.Setup(framework => framework.GetPeople())
                .Returns(new List<Person>() {
                    new Person()
                    {
                        
                    }
                });

            IPersonRepository repository = mock.Object;
            IEnumerable<Person> people = repository.GetPeople();

            var count = 0;
            var enumerator = people.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var current = enumerator.Current;
                count++;
            }

            //act
            int result = 1;

            //assert
            Assert.Equal(result, count);
        }

        [Fact]
        public void PersonRepoShouldBeAbleToAddAPerson()
        {

            //arrange
            var person = new Person()
            {
                FirstName = "testiiiiiiiiiiiiiiiiiiiiii",
                LastName = "test",
                Address = null,
                Age = 32,
                Email = "test@test.com",
                Gender = Gender.Female,
                Interests = new List<Interests>() { },
                Phone = "444-444-4444",
                Picture = new Picture() { Large = "http://fake.png" }
            };
            var mock = new Mock<IPersonRepository>();
            mock.Setup(framework => framework.AddPerson(person));
            mock.Setup(framework => framework.SaveChangesAsync()).ReturnsAsync(
                Task.Run(() =>
                {
                    return true;
                }).GetAwaiter().GetResult());

            IPersonRepository repository = mock.Object;
            repository.AddPerson(person);


            //act
            var success = repository.SaveChangesAsync().GetAwaiter().GetResult();

            //assert
            Assert.True(success);
        }


        [Fact]
        public void PeopleBuilderShouldReturnOnePerson()
        {


            /* ---------------
             * MOCK the repo
             * ---------------
             */
            var mockRepo = new Mock<IPersonRepository>();
            mockRepo.Setup(framework => framework.GetPeople())
                .Returns(new List<Person>() {
                    new Person()
                    {
                        FirstName = "Tester"
                    }
                });
            IPersonRepository mockedRepo = mockRepo.Object;


            /* ---------------
             * MOCK the Builder
             * ---------------
             */
            var list = new List<Person>() {
                    new Person()
                    {
                        FirstName = "Fake",
                        LastName = "Fake N",
                        Email = "example@example.com",
                        Gender = Gender.Male,
                        Address = null,
                        Phone = "434-333-3333",
                        Picture = null
                    }
            };
            var mockBuilder = new Mock<IPeopleBuilder>();
            mockBuilder.Setup(framework => framework.BuildPeople())
                .Returns(list);
            IPeopleBuilder mockedbuilder = mockBuilder.Object;


            /* ---------------
             * MOCK the Service Client
             * ---------------
             */
            var mockService = new Mock<IPeopleServiceClient>();
            mockService.Setup(framework => framework.GetPeople())
                .Returns(list);
            IPeopleServiceClient mockedService = mockService.Object;


            //Build necessary structure
            IPeopleServiceClient serviceClient = new PeopleServiceClient(mockedRepo);
            IPeopleBuilder builder = new PeopleBuilder(mockedService) { };


            IEnumerable<Person> people = builder.BuildPeople();

            //act
            Console.WriteLine($"------------------ ACTING -- Count of how many people in the list : {((List<Person>)people).Count}");
            var result = ((List<Person>)people).Count > 0;

            //assert
            Assert.True(result);
        }

        [Fact]
        public void PeopleDirectorShouldReturnAListOfOne()
        {
            //arrange
           
            /* ---------------
             * MOCK the repo
             * ---------------
             */
            var mockRepo = new Mock<IPersonRepository>();
            mockRepo.Setup(framework => framework.GetPeople())
                .Returns(new List<Person>() {
                    new Person()
                    {
                        FirstName = "Tester"
                    }
                });
            IPersonRepository mockedRepo = mockRepo.Object;


            /* ---------------
             * MOCK the Builder
             * ---------------
             */
            var list = new List<Person>() {
                    new Person()
                    {
                        FirstName = "Fake",
                        LastName = "Fake N",
                        Email = "example@example.com",
                        Gender = Gender.Male,
                        Address = null,
                        Phone = "434-333-3333",
                        Picture = null
                    }
            };
            var mockBuilder = new Mock<IPeopleBuilder>();
            mockBuilder.Setup(framework => framework.BuildPeople())
                .Returns(list);
            IPeopleBuilder mockedbuilder = mockBuilder.Object;


            /* ---------------
             * MOCK the Service Client
             * ---------------
             */
            var mockService = new Mock<IPeopleServiceClient>();
            mockService.Setup(framework => framework.GetPeople())
                .Returns(list);
            IPeopleServiceClient mockedService = mockService.Object;


            //Build necessary structure
            IPeopleServiceClient serviceClient = new PeopleServiceClient(mockedRepo);
            IPeopleBuilder builder = new PeopleBuilder(mockedService) { };
            IPeopleDirector director = new PeopleDirector(mockedRepo, builder, serviceClient) { };

            //get the people
            IEnumerable<Person> people = director.BuildPeople();

            var count = 0;
            var enumerator = people.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var current = enumerator.Current;
                count++;
            }

            //act
            int result = 1;

            //assert
            Assert.Equal(result, count);
        }
        
    }
}
