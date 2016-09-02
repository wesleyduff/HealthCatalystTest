using Asset1.Domain.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Domain.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private PeopleContext _context;
        private ILogger<PersonRepository> _logger;

        public PersonRepository(
            PeopleContext context,
            ILogger<PersonRepository> logger
        )
        {
            _context = context;
            _logger = logger;
        }
        
        public IEnumerable<Person> GetPeople()
        {
            _logger.LogInformation("Getting All People From The DataBase");
            return _context.Person.ToList();
        }

        public void AddPerson(Person person)
        {
            _context.Add(person);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
