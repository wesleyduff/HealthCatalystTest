using Asset1.Domain.Entities;
using Asset1.Domain.Repositories;
using Asset1.PlatformClient.PeopleClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Business.Builders.PeopleBuilder
{
    /// <summary>
    /// Builder is responsible to build the IEnumerable of People
    /// </summary>
    public class PeopleBuilder : IPeopleBuilder
    {
        private IPeopleServiceClient _client;

        /// <summary>
        /// People Builder builds the people list. 
        /// The Director has requested a build
        /// </summary>
        /// <param name="client"></param>
        public PeopleBuilder(
            IPeopleServiceClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Method that handles the call to the client for the data;
        /// </summary>
        /// <returs>IEnumerable of Person</returns>
        public IEnumerable<Person> BuildPeople()
        {
            return _client.GetPeople();
        }
    }
}
