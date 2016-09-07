using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Asset1.Web.Controllers.Web
{
    public class AppController : Controller
    {
        /// <summary>
        /// Main view when app loads
        /// </summary>
        /// <returns>Dashboard.cshtml Razor View</returns>
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
