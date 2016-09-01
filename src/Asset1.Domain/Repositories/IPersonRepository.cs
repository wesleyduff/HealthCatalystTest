using System.Collections.Generic;
using Asset1.Domain.Entities;

namespace Asset1.Domain.Repositories
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPeople();
    }
}