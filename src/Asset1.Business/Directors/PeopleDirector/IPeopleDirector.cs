using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Directors.PeopleDirector
{
    public interface IPeopleDirector
    {
        IEnumerable<Person> BuildPeople();
        IEnumerable<Person> SearchPeople(string search);
        Person GetPerson(int Id);
        Task<bool> SavePeopleAsync(Person person);
    }
}
