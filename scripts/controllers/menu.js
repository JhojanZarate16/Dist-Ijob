'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('MenuCtrl', function ($location,$rootScope) {
    var vm = this;    
    if(!$rootScope.user){ // se recupera del storage en caso de refresh de la página        
        $rootScope.user = { 
            email:localStorage.getItem("correo"),
            name: localStorage.getItem("nombre"),
            lastName: localStorage.getItem("apellidos"),
            id: localStorage.getItem("id"),
            token:  localStorage.getItem("token")
        };        
    }
  
    
    vm.logout = function(){        
        $rootScope.user = {};        
        localStorage.clear();
        $location.path('/');
    };    
  });
