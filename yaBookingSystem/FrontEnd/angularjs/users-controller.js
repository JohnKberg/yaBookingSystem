var app = angular.module('UsersApp', []);

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LADDAR...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {

                if (typeof val === 'undefined')
                    console.log('val is undefined')

                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
})

app.controller('UsersCtrl', function ($scope, $http) {

    console.log('Controller ctor here');
    $scope.loading = false;
    $scope.users = [];
    $scope.editMode = false;
    
    
    /*
     * LIST USERS
     */
    $scope.listUsers = function () {
        $scope.loading = true;

        $scope.users = [];
        $http.get("/api/Users")
        .success(function (data, status, headers, config) {            
            $scope.users = data;
            $scope.loading = false;
        })
        .error(function (data, status, headers, config) {
            $scope.msgError("Kunde inte hämta användare. STATUS: " + status)
            $scope.loading = false;
        });
        
    };

    /*
     * ADD USER
     */
    $scope.tempUser = {};
    

    $scope.addUser = function () {
        $http.post('/api/Users', { 'Id': $scope.tempUser.Id, 'Name': $scope.tempUser.Name, 'Password': $scope.tempUser.Password })
        .success(function (data, status, headers, config) {
            $scope.users.push(data);
            $scope.tempUser = {};            
            $('.form-control').val('');
            $('.usersform').slideUp();
            $scope.msgSuccess(data.Name + " skapades.");
            
        })
        .error(function (data, status, headers, config) {
            $scope.msgError("Fel inträffade. Status: " + status);
        });
    };

    /*
     * EDIT USER
     */
    $scope.editUser = function (user) {        

        $scope.editMode = true;
        $scope.tempUser = {
            Id: user.Id,
            Name: user.Name,
            Password: user.Password            
        };
        $scope.index = $scope.users.indexOf(user);
        $('.usersform').slideDown();
        
    };


    $scope.saveEditUser = function () {
        var url = '/api/Users/' + $scope.tempUser.Id;
        $http.put(url, { 'Id': $scope.tempUser.Id, 'Name': $scope.tempUser.Name, 'Password': $scope.tempUser.Password })
        .success(function (data, status, headers, config) {

            //$scope.users[$scope.index].Id = $scope.tempUserData.Id;
            //$scope.users[$scope.index].Name = $scope.tempUserData.Name;
            //$scope.users[$scope.index].Password = $scope.tempUserData.Password;

            
            $scope.msgSuccess($scope.tempUser.Name + " uppdaterades.");
            $('.form-control').val('');
            $('.usersform').slideUp();            
            $scope.tempUser = {};
            $scope.listUsers();

        })
        .error(function (data, status, headers, config) {
            $scope.msgError("Fel inträffade. Status: " + status);
        });

        $scope.editMode = false;
    };


    /*
     * DELETE USER
     */
    $scope.deleteUser = function (user) {
        var url = '/api/Users/' + user.Id;
        $http.delete(url)
        .success(function (data, status, headers, config) {
            $scope.msgSuccess(user.Name + " raderades.");
            
            $scope.listUsers();

        })
        .error(function (data, status, headers, config) {
            $scope.msgError("Fel inträffade. Status: " + status);
        });
    };

    /*
     * Success message
     */
    $scope.msgSuccess = function (msg) {
        $('.alert-success > p').html(msg);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function () {
            $('.alert-success > p').html('');
        });
    };

    /*
     * Error message
     */
    $scope.msgError = function (msg) {
        $('.alert-danger > p').html(msg);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function () {
            $('.alert-danger > p').html('');
        });
    };

});