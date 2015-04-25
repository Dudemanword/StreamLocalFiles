using System;
using System.Web.Mvc;

namespace StreamLocalFiles.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }

        public ViewResult FileRetrievalSpecRunner()
        {
            return View("FileRetrievalSpecRunner");
        }
    }
}
