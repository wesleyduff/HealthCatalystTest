using System;
using Xunit;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Moq;
using System.Collections;
using System.Collections.Generic;

namespace Tests
{
    public class PersonTests
    {
        [Fact]
        public void PersonsFirstNameShouldBeWes() 
        {
            //arrange
            var Person = new Person("wes", "duff");

            //act
            var result = String.Equals("wes", Person.FirstName);

            //assert
            Assert.True(result);
        }

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
    }
}
