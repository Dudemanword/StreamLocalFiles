describe("FileController", function () {
    var mockFileService, scope, createController, httpBackend, fileService, http;
    beforeEach(function () {
        module('streamLocalFiles')
    })

    beforeEach(inject(function ($injector, $rootScope, $controller, $httpBackend, $http) {
        scope = $rootScope.$new();
        http = $http;
        createController = function () {
            return $controller('FileController', {
                '$scope': scope,
                '$http': http
            });
        }
        httpBackend = $httpBackend;
        httpBackend.when('GET', '/api/files').respond([{ Name: "TestFile", Type: "File" }]);
        //$httpBackend = $injector.get('$httpBackend');
    }));

    it("should retrieve file data from the server", function () {       
        var controller = createController();
        
        scope.getFiles();
        httpBackend.flush();
    });

    it("should get only files when the server sends back data", function () {
        module(function ($provide) {
            mockFileService = {
                retrieveData: function () {
                    return "This is a test!";
                },
                getOnlyFiles: function () {
                    return "I'll populate this at some point";
                }
            };

            $provide.value('$fileService', mockFileService);
        })
        spyOn(mockFileService, 'getOnlyFiles');
        
        scope.getFiles();
        expect(mockFileService.getOnlyFiles).toHaveBeenCalledWith('This is a test!');
    });
});