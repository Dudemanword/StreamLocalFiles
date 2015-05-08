using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
namespace StreamLocalFiles.Controllers
{   
    public class FilesController : ApiController
    {
        [Route("files")]
        [HttpGet]
        public IHttpActionResult Get()
        {   
            IFileOperations fileRetriever = new FileOperations();
            var directoryInfo = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Music/"));
            var filesAndFolders = fileRetriever.GetFileAndFolderList(directoryInfo);
            return Json(filesAndFolders);
        }

        [Route("addFiles")]
        [HttpPost]
        public IHttpActionResult Post()
        {
            var httpRequest = HttpContext.Current.Request;

            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                HttpPostedFile file = httpRequest.Files[i];
                var fileName = System.Web.HttpContext.Current.Server.MapPath("~/Music/" + file.FileName);
                file.SaveAs(fileName);
            }
            return Ok(); 
        }
    }
}
