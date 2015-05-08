var mediaFiles;
var app = angular.module("streamLocalFiles", ['ngSanitize','ngRoute']);
app.controller("FileController", function ($scope, $http, $fileService, $route) {
    var data;
    $scope.getFiles = function () {
        data = $fileService.retrieveDataFromServer().then(function (data) {
            var files = $fileService.getOnlyFiles(data);
            $scope.files = files;
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

    $scope.addFiles = function (files) {
        var filesToAdd = [];

        for (var i = 0; i < files.length; i++) {
            filesToAdd.push(files[i].file)
        }

        $fileService.addFilesToDirectory(files, $route, $scope);
    }

    //Initialize on Controller load
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

    this.addFilesToDirectory = function (data, $route, $scope) {
        $http({
            method: "POST",
            url: "/api/files/addFiles",
            headers: { "Content-Type": undefined },
            transformRequest: function (data) {
                console.log("data: \n", data);
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { model: { name: "", comments: "" }, files: data }
        }).success(function () {
            $scope.getFiles();
        });
    }
});
