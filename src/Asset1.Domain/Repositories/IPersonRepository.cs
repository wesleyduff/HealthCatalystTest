using System.Collections.Generic;
using Asset1.Domain.Entities;
using System.Threading.Tasks;

namespace Asset1.Domain.Repositories
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPeople();

        void AddPerson(Person person);

        Task<bool> SaveChangesAsync();

        Person GetPersonById(int Id);
    }
}