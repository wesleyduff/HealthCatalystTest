using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Builders.PeopleBuilder
{
    public class PeopleBuilder
    {
        private IPersonRepository _repository;

        public PeopleBuilder(IPersonRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Person> BuildPeople()
        {
            return _repository.GetPeople();
        }
    }
}
