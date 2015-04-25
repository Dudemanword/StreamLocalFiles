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
    }
}
