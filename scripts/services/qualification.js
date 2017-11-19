'use strict';

var QualificationService = function($http, UserService){
    var service = {};
    var uri = 'http://vmijob.cloudapp.net/api/';
    var token = localStorage.getItem("token");
    var id = localStorage.getItem("id");

    var get = function(payload){
        // 5574cbead21d757c0a000002
        console.log(id, '5574cbead21d757c0a000002')
        //id = '5574cbead21d757c0a000002';
        return $http({
            method: 'GET',
            url: uri + 'calificaciones/realizadas/' + id +'/'+payload.page+'/'+payload.type,
            headers: {
              'authorization': "bearer " + localStorage.getItem('token')
            }
          });
    };

    var getPending = function(payload){
        return $http({
            method: 'GET',
            url: uri + 'calificaciones/pendientes/' + id +'/'+payload.page,
            headers: {
              'authorization': "bearer " + localStorage.getItem('token')
            }
          });
    };

    var qualify = function(payload){
        return $http({
            method: 'PUT',
            data: payload,
            url: uri + 'calificaciones/',
            headers: {
              'authorization': "bearer " + localStorage.getItem('token')
            }
          });
    };

    var update = function(){
        $http.put()

    };

    service.get = get;
    service.getPending = getPending;
    service.qualify = qualify;
    return service;
};

angular.module('ijobApp').factory('QualificationService', QualificationService);

QualificationService.$inject = ['$http'];