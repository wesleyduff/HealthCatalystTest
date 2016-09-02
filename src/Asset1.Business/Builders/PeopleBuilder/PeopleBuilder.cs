using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Asset1.PlatformClient.PeopleClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Builders.PeopleBuilder
{
    public class PeopleBuilder : IPeopleBuilder
    {
        private IPeopleServiceClient _client;
        private IPersonRepository _repository;

        public PeopleBuilder(
            IPersonRepository repository,
            IPeopleServiceClient client)
        {
            _repository = repository;
            _client = client;
        }

        public IEnumerable<Person> BuildPeople()
        {
            return _client.GetPeople();
        }
    }
}
