using Asset1.Business.Directors.PeopleDirector;
using Asset1.Composers.People;
using Asset1.Domain.Entities;
using Asset1.PlatformClient.PeopleClient;
using Asset1.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
                return Ok(Mapper.Map<IEnumerable<PersonViewModel>>(_director.BuildPeople()));
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Add a new person to the list of people
        /// </summary>
        /// <param name="thePerson"></param>
        /// <returns>Person View Model if creation was successful.</returns>
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]PersonViewModel thePerson)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //Map
                    var mappedPerson = Mapper.Map<Person>(thePerson);

                    //save to DB
                    if (await _director.SavePeopleAsync(mappedPerson))
                    {
                        //call context for people IEnumerable
                        return Created($"api/people/{thePerson.FirstName}", Mapper.Map<PersonViewModel>(mappedPerson));
                    }
                    else
                    {

                        return BadRequest(
                                    JObject.FromObject(new {
                                            status = "Bad Request",
                                            result = ModelState,//using this because it is for my debuging purposes only... Not for production
                                            message ="Failed to save changes to the DataBase."
                                        }));
                    }
                    
                }
                catch (Exception ex)
                {

                    return BadRequest(JObject.FromObject(new {
                                        status = "Exception Thrown",
                                        result = ModelState,//using this because it is for my debuging purposes only... Not for production
                                        message = ex.Message
                                    }));
                }
            }

            return BadRequest(
                JObject.FromObject(new {
                        status = "Bad Data - Model State is faulty",
                        result = ModelState //using this because it is for my debuging purposes only... Not for production
                    }));

        }

        /// <summary>
        /// Get a person from the database by their Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns>A JSON object of a persons data from the database</returns>
        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            var person = _director.GetPerson(Id);

            if(person != null)
            {
               return Ok(person);
            } else
            {
               return BadRequest(
                    JObject.FromObject(new {
                                            status = "Bad Request",
                                            result = ModelState,//using this because it is for my debuging purposes only... Not for production
                                            message = $"Problem getting person with and id of {Id}",
                                        }));
            }
        }
    }
}
