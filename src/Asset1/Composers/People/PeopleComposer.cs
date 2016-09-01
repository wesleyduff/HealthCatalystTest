using Asset1.Composers.People;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Asset1.Domain.Entities;
using Newtonsoft.Json.Linq;
using Asset1.Business.Directors.PeopleDirector;
using Asset1.Domain.Repositories;

namespace Asset1.Composers.People
{
    public class PeopleComposer : IPeopleComposer
    {

        private readonly IPeopleDirector _director;

        public PeopleComposer(IPeopleDirector director)
        {
            _director = director;
        }

        public JObject Compose()
        {
            try
            {

                //get the list of people
                var data = _director.BuildPeople();


                return 
                    JObject.FromObject(
                       new
                       {
                           status = "success",
                           result = data,
                           message = "Offer has alredy been added"
                       }
               );
            }
            catch(Exception ex)
            {
                return
                   JObject.FromObject(
                   new
                   {
                       status = "Exception Thrown",
                       result = false,
                       message = ex.Message
                   }
               );
            }
           
        }
    }
}
