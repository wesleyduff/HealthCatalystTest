using Asset1.Domain.Entities;
using Microsoft.EntityFrameworkCore;
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
        
        /// <summary>
        /// Get an IEnumerable of Person
        /// </summary>
        /// <returns>IEnumerable of Person</returns>
        public IEnumerable<Person> GetPeople()
        {
            _logger.LogInformation("Getting All People From The DataBase");
            return _context.Person
                .Include(t => t.Interests)
                .Include(t => t.Address)
                .Include(t => t.Picture)
                .ToList();
        }

        /// <summary>
        /// Search People by string
        /// </summary>
        /// <param name="Search"></param>
        /// <returns>IEnumerable of person</returns>
        public IEnumerable<Person> SearchPeople(string search)
        {
            return _context.Person
               .Include(t => t.Interests)
               .Include(t => t.Address)
               .Include(t => t.Picture)
               .Where(x => x.FullName.IndexOf(search, StringComparison.CurrentCultureIgnoreCase) != -1)
               .ToList();
        }


        /// <summary>
        /// Add a person to the DB
        /// </summary>
        /// <param name="person"></param>
        public void AddPerson(Person person)
        {
            _context.Add(person);
        }


        /// <summary>
        /// Save changes to the DB
        /// </summary>
        /// <returns>Async Task of bool</returns>
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        /// <summary>
        /// Get person by id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>person</returns>
        public Person GetPersonById(int Id)
        {
            return _context.Person.Where(t => t.Id == Id)
                .Include(t => t.Interests)
                .Include(t => t.Address)
                .Include(t => t.Picture)
                .FirstOrDefault();
        }
    }
}
