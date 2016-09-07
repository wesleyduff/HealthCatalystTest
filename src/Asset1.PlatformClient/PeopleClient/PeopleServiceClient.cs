using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;

namespace Asset1.PlatformClient.PeopleClient
{
    public class PeopleServiceClient : IPeopleServiceClient
    {
        private IPersonRepository _repository;

        public PeopleServiceClient(IPersonRepository repository)
        {
            _repository = repository;
        }


        public void AddPerson(Person person)
        {
            _repository.AddPerson(person);
        }

        /// <summary>
        /// Get People
        /// </summary>
        /// <returns>IEnumerable of Person</returns>
        public IEnumerable<Person> GetPeople()
        {
            return _repository.GetPeople();
        }

        /// <summary>
        /// Search people by string
        /// </summary>
        /// <param name="search"></param>
        /// <returns>IEnumerable of person</returns>
        public IEnumerable<Person> SearchPeople(string search)
        {
            return _repository.SearchPeople(search);
        }

        /// <summary>
        /// Get Person by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>Person</returns>
        public Person GetPersonById(int Id)
        {
            try
            {
                return _repository.GetPersonById(Id);
            }
            catch
            {
                return null;
            }
        }
        /// <summary>
        /// Save changes to the DB Async
        /// </summary>
        /// <returns>async Task of bool</returns>
        public async Task<bool> SaveChangesAsync()
        {
            return await _repository.SaveChangesAsync();
        }
    }
}
