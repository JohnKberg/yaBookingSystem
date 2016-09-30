var app = angular.module('UsersApp', []);

app.controller('UsersCtrl', function ($scope, $html) {

    $scope.users = [];
    
    $scope.listUsers = function () {

        $scope.users = [];

        $http.get("/api/Users").success(function (data, status, headers, config) {

            $scope.users = data;

            //TODO: Add code here...

        }).error(function (data, status, headers, config) {

            //TODO: Add code here...

        });
    };
});