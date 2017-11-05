'use strict';



var CommonService = function ($http)  {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/';
  service.Roles = [{
      codigo: '1',
      nombre: 'Cliente'
    },
    {
      codigo: '2',
      nombre: 'Proveedor'
    }
  ];
  service.Genero = [{
      codigo: '1',
      nombre: 'Masculino'
    },
    {
      codigo: '2',
      nombre: 'Femenino'
    }
  ];
  service.MetodoRegistro = [{
    codigo: '4',
    nombre: 'nativo'
  }];

  service.getUbicaciones = function(){
    return $http.get(uri+ '/ubicaciones/');
  }

  service.getSectores = function(){
    return $http.get(uri+ '/sectores/');
  }

  service.getOcupaciones = function(){
    return $http.get(uri+ '/ocupaciones/');
  }

  service.getEscolaridad = function(){
    return $http.get(uri+ '/usuario-escolaridad/');
  }

  service.getRoles = function(){
    return $http.get(uri+ '/usuario-roles/');
  }

  service.getEstados = function(){
    return $http.get(uri+ '/usuario-estados/');
  }

  return service;
};

angular
  .module('ijobApp')
  .factory('CommonService', CommonService);

CommonService.$inject = ['$http'];
