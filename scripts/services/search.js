'use strict';

var SearchService = function ($http)  {
    var service = {};
    var uri = 'http://vmijob.cloudapp.net/api/busqueda';

    service.search = function(){
        return $http.get(uri+'/jobsmes');
    };

    service.adSearch = function(id, payload){
        return $http({
            method: 'PUT',
            url: uri + '/' + id + '/avanzada',
            data: payload,
            headers: {
              'authorization': "bearer " + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          });
    };


    return service;

};

angular
.module('ijobApp')
.factory('SearchService', SearchService);

SearchService.$inject = ['$http'];