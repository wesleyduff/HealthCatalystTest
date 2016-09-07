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
        /// <summary>
        /// Directors responsibility is to call get the people list from the cache or build a new object from the database.
        /// </summary>
        /// <returns>IEnumerable of People </returns>
        IEnumerable<Person> BuildPeople();
        /// <summary>
        /// Get a person by ID. Returns one person
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>A Person Object</returns>
        Person GetPerson(int Id);
        /// <summary>
        /// Save the person to the database
        /// </summary>
        /// <param name="person"></param>
        /// <returns>An Async Method of a bool value</returns>
        Task<bool> SavePeopleAsync(Person person);
    }
}
