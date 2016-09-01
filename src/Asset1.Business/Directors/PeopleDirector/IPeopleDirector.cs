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
    }
}
