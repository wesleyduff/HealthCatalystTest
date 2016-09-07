using Asset1.Business.Builders.PeopleBuilder;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Asset1.PlatformClient.PeopleClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Asset1.Business.Directors.PeopleDirector
{
    public class PeopleDirector : IPeopleDirector
    {
        private IPeopleBuilder _builder;
        private IPeopleServiceClient _client;
        private IPersonRepository _repository;
        /// <summary>
        /// Directors responsibility is to call get the people list from the cache or build a new object from the database.
        /// </summary>
        /// <returns>IEnumerable of People </returns>
        public PeopleDirector(
            IPersonRepository repository,
            IPeopleBuilder builder,
            IPeopleServiceClient client
            )
        {
            _repository = repository;
            _builder = builder;
            _client = client;
        }

       /// <summary>
       /// Method to call to execute the build process
       /// </summary>
       /// <returns>IEnumberable of Person</returns>
        public IEnumerable<Person> BuildPeople()
        {
            try
            {
                //check if the list of people are in the cash?

                //if cash is null or empty then query for people again
                //build peoples list

                return _builder.BuildPeople();
            }
            catch (Exception ex)
            {
                throw new Exception("There was a problem building people", ex);
            }

        }
        /// <summary>
        /// Search People by string
        /// </summary>
        /// <param name="search"></param>
        /// <returns>An IEnumerable of Person</returns>
        public IEnumerable<Person> SearchPeople(string search)
        {
            //call the service
           return _client.SearchPeople(search);
        }

        /// <summary>
        /// Get a person by ID. Returns one person
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>A Person Object</returns>
        public Person GetPerson(int Id)
        {
            return _client.GetPersonById(Id);
        }

        /// <summary>
        /// Save the person to the database
        /// </summary>
        /// <param name="person"></param>
        /// <returns>An Async Method of a bool value</returns>
        public async Task<bool> SavePeopleAsync(Person person)
        {
            //check to see if the person exists...
            //if does not exist then add
            //if exists then return true... because the user is already in the DB
            // TODO
            _repository.AddPerson(person);

            return await _repository.SaveChangesAsync();
        }
    }
}
