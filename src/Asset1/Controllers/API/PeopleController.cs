using Asset1.Business.Directors.PeopleDirector;
using Asset1.Domain.Entities;
using Asset1.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asset1.Controllers.API
{
    [Route("api/people")]
    public class PeopleController : Controller
    {
        private IPeopleDirector _director;

        public PeopleController(IPeopleDirector director)
        {
            _director = director;
        }

        /// <summary>
        /// API call to get all people from repository
        /// </summary>
        /// <returns>An array of Person Objects</returns>
        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {

                //call context for people IEnumerable
                return Ok(_director.BuildPeople());
            } 
            catch(Exception ex)
            {
                return Ok(
                            JObject.FromObject(
                                new
                                {
                                    status = "Exception Thrown",
                                    result = false,
                                    message = ex.Message
                                }
                            )
                        );
            }
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]PersonViewModel thePerson)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    //save to DB

                    //call context for people IEnumerable
                    return Created($"api/people/{thePerson.FirstName}", thePerson);
                }
                catch (Exception ex)
                {
                    return Ok(
                                JObject.FromObject(
                                    new
                                    {
                                        status = "Exception Thrown",
                                        result = ModelState,//using this because it is for my debuging purposes only... Not for production
                                        message = ex.Message
                                    }
                                )
                            );
                }
            }

            return Ok(
                JObject.FromObject(
                    new
                    {
                        status = "Bad Data - Model State is faulty",
                        result = ModelState //using this because it is for my debuging purposes only... Not for production
                    }
                )
            );

        }
    }
}
