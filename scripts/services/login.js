'use strict';

var LoginService = function ($http) {
  var service = { };
  var uri = 'http://vmijob.cloudapp.net/api/usuarios/autenticar';
  var login = function (payload)  { return $http.post(uri, payload); };
  service.uri = uri;
  service.login =  login  ;
  return service;
};
angular.module('ijobApp').factory('LoginService', LoginService);

LoginService.$inject = ['$http'];