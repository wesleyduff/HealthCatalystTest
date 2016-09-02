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

        public IEnumerable<Person> GetPeople()
        {
            return _repository.GetPeople();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _repository.SaveChangesAsync();
        }
    }
}
