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
        public void PeopleBuilderShouldReturnOnePerson()
        {
            //arrang
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
            var mock = new Mock<IPeopleBuilder>();
            mock.Setup(framework => framework.BuildPeople())
                .Returns(list);
            IPeopleBuilder builder = mock.Object;
            IEnumerable<Person> people = builder.BuildPeople();

            //act
            Console.WriteLine($"------------------ ACTING -- Count of how many people in the list : {((List<Person>)people).Count}");
            var result = ((List<Person>)people).Count > 0;

            //assert
            Assert.True(result);
        }
    }
}
