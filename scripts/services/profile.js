'use strict';

var ProfileService = function($http, UserService){
    var service = {};
    var uri = 'http://vmijob.cloudapp.net/api/';
    var token = localStorage.getItem("token");
    var id = localStorage.getItem("id");

    var getUserInfo = function(){
        return UserService.GetById(id);
    };

    var update = function(){
        $http.put()

    };


    return service;
};

angular.module('ijobApp').factory('ProfileService', ProfileService);

ProfileService.$inject = ['$http'];