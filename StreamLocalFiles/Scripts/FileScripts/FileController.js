var mediaFiles;
var app = angular.module("streamLocalFiles", ['ngSanitize']);
app.controller("FileController", function ($scope, $http, $fileService) {
    var data;
    $scope.getFiles = function () {
        data = $fileService.retrieveDataFromServer().then(function (data) {
            var blah = $fileService.getOnlyFiles(data);
            $scope.files = blah;
        });
    };

    $scope.init = function () {
        if (mediaFiles === null || mediaFiles === undefined) {
            mediaFiles = $scope.getFiles();
        }
        else {
            $scope = mediaFiles;
        }
    }
    //$scope.addFiles = function (files) {
    //    var whatIsThis = files;
   // }
    $scope.init();
});

app.service('$fileService', function ($http, $q, $sce) {
    this.retrieveDataFromServer = function () {
        return $q(function (resolve, reject) {
            $http.get('/api/files').success(function (data) {
                resolve(data);
            });
        });
        
    }

    this.getOnlyFiles = function (data) {
        var fileNames;
        var files = [];

        data.forEach(function (element, index, array) {
            if (element.Type == "File") {
                element.Path = $sce.trustAsResourceUrl("/music/" + element.Path)
                files.push(element);
            }
        });
        return files
    }
});
