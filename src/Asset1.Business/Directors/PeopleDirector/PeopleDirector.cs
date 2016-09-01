using Asset1.Business.Builders.PeopleBuilder;
using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Directors.PeopleDirector
{
    public class PeopleDirector : IPeopleDirector
    {
        private IPersonRepository _repository;
        private PeopleBuilder _builder;

        public PeopleDirector(IPersonRepository repository)
        {
            _repository = repository;
            _builder = new PeopleBuilder(_repository);
        }

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
    }
}
