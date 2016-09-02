using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Asset1.Domain.Entities;
using Asset1.Composers.People;
using Asset1.Domain.Repositories;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Asset1.Controllers.Web
{
    public class PeopleController : Controller
    {
        private IPeopleComposer _composer;
        private ILogger<PeopleController> _logger;

        public PeopleController(
            IPeopleComposer composer,
            ILogger<PeopleController> logger
        )
        {
            _composer = composer;
            _logger = logger;
        }


        /// <summary>
        /// Manage all people in Database. Instant delete and UI elements to Add / Edit a person
        /// </summary>
        /// <returns></returns>
        public IActionResult Manage()
        {
            return View();
        }

        /// <summary>
        /// Search Page to filter people 
        /// Should : 
        /// The application accepts search input in a text box and then displays 
        /// in a pleasing style a list of people where any part of their first or 
        /// last name matches what was typed in the search box (displaying at least 
        /// name, address, age, interests, and a picture). 
        /// Seeding Data for this from : https://randomuser.me
        /// </summary>
        /// <returns>View</returns>
        public IActionResult Search()
        {
            return View();
        }
    }
}
