using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.PlatformClient.PeopleClient
{
    public interface IPeopleServiceClient
    {
        IEnumerable<Person> GetPeople();

        void AddPerson(Person person);

        Task<bool> SaveChangesAsync();
    }
}
