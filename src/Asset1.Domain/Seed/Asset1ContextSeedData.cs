using Asset1.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Domain.Seed
{
    public class Asset1ContextSeedData
    {
        private PeopleContext _context;

        public Asset1ContextSeedData(PeopleContext context )
        {
            _context = context;
        }

        public async Task EnsureSeedData()
        {
            if (!_context.Person.Any())
            {
                #region --- People for Seed
                var person1 = new Person()
                {
                    FirstName = "louna",
                    LastName = "roche",
                    DateCreated = DateTime.UtcNow,
                    Email = "louna.roche@example.com",
                    Gender = Gender.Female,
                    Location = new Location()
                    {
                        City = "le mont-sur-lausanne",
                        PostalCode = "3971",
                        State = States.AK,
                        Street = "4911 esplande du 9"
                    },
                    Phone = "(619)343-2222",
                    Picture = new Picture()
                    {
                        Large = "https://randomuser.me/api/portraits/women/4.jpg",
                        Medium = "https://randomuser.me/api/portraits/med/women/4.jpg",
                        Small = "https://randomuser.me/api/portraits/thumb/women/4.jpg"
                    },
                    Title = SirName.Miss
                };

                var person2 = new Person()
                {
                    FirstName = "sofie",
                    LastName = "andersen",
                    DateCreated = DateTime.UtcNow,
                    Email = "sofie.andersen@example.com",
                    Gender = Gender.Female,
                    Location = new Location()
                    {
                        City = "beder",
                        PostalCode = "95887",
                        State = States.AK,
                        Street = "6375 fredensvej"
                    },
                    Phone = "(632)343-3422",
                    Picture = new Picture()
                    {
                        Large = "https://randomuser.me/api/portraits/women/12.jpg",
                        Medium = "https://randomuser.me/api/portraits/med/women/12.jpg",
                        Small = "https://randomuser.me/api/portraits/thumb/women/12.jpg"
                    },
                    Title = SirName.Mrs
                };
                var person3 = new Person()
                {
                    FirstName = "jeremy",
                    LastName = "jones",
                    DateCreated = DateTime.UtcNow,
                    Email = "jeremy.jones@example.com",
                    Gender = Gender.Male,
                    Location = new Location()
                    {
                        City = "beder",
                        PostalCode = "95887",
                        State = States.AK,
                        Street = "6375 fredensvej"
                    },
                    Phone = "(512)222-2222",
                    Picture = new Picture()
                    {
                        Large = "https://randomuser.me/api/portraits/men/63.jpg",
                        Medium = "https://randomuser.me/api/portraits/med/men/63.jpg",
                        Small = "https://randomuser.me/api/portraits/thumb/men/63.jpg"
                    },
                    Title = SirName.Mr
                };
                #endregion

                #region --- Add People to DB Context

                _context.Person.Add(person1);
                _context.Person.Add(person2);
                _context.Person.Add(person3);

                #endregion

                //save changes to DB
                await _context.SaveChangesAsync();
            }
        }
    }
}
