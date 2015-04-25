using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace StreamLocalFiles.Controllers
{
    public class FileOperations : IFileOperations
    {
        //private const string pathToMusicDirectory = @"\\localhost\Users\Shaun\Music\";
        public List<FileInformation> GetFileAndFolderList(DirectoryInfo directoryInfo)
        {
            var directories = GetDirectories(directoryInfo);
            var fileList = GetListOfFiles(directoryInfo);

            directories.AddRange(fileList);
            return directories; 
        }
        
        public FileStream RetrieveFileToStream(string path)
        {
            using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                return fs;
            }
        }
        private List<FileInformation> GetListOfFiles(DirectoryInfo directoryInfo)
        {
            var listOfFiles = new List<FileInformation>();
            foreach (FileInfo f in directoryInfo.GetFiles("*.*"))
            {
                listOfFiles.Add(new FileInformation { Name = f.Name, Type = "File", Path = f.Name });
            }
            return listOfFiles;
        }

        private List<FileInformation> GetDirectories(DirectoryInfo directoryInfo)
        {
            var listOfDirectories = new List<FileInformation>();
            foreach (DirectoryInfo f in directoryInfo.GetDirectories())
            {
                listOfDirectories.Add(new FileInformation { Name = f.Name, Type = "Folder", Path = f.Name });
            }
            return listOfDirectories;

        }

        public void DeleteFiles()
        {
            throw new NotImplementedException();
        }

        public void RenameFiles()
        {
            throw new NotImplementedException();
        }

        public void MoveFiles()
        {
            throw new NotImplementedException();
        }

        public void CreateFiles()
        {
            throw new NotImplementedException();
        }
    }
}
