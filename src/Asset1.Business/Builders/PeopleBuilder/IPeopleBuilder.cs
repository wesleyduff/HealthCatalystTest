using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Builders.PeopleBuilder
{
    public interface IPeopleBuilder
    {
        IEnumerable<Person> BuildPeople();
    }
}
