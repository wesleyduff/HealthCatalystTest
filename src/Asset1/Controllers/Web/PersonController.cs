using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Asset1.ViewModels;
using Asset1.Domain.Entities;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Asset1.Controllers.Web
{
    public class PersonController : Controller
    {

        private PeopleContext _context;

        public PersonController(PeopleContext context)
        {
            _context = context;
        }

        // GET: /<controller>/
        public IActionResult Manage()
        {
            //call director to build 
            return View();
        }

        [HttpPost]
        public IActionResult Manage(PersonViewModel model)
        {
            //do some other checks
            if (model.FirstName.Contains("wes"))
            {
                ModelState.AddModelError("", "This is an example of extra validation!");
                // Show up next to FirstName 
                // ModelState.AddModelError("FirstName", "This is an example of extra validation!");
                //show up in model summary

            }
            if (ModelState.IsValid)
            {
                //create / update person

            }
            return View();
        }
    }
}
