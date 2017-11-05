'use strict';



var ContactsService = function ($http) {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/contactos';

  // GET
  function getActiveContacts(id) {
    return $http({
      method: 'GET',
      url: uri + '/activos/' + id,      
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  // GET
  function getPending(id, tipo) {
    console.log('uri => ', uri + '/pendientes/' + id + '/' + tipo);
    
    return $http({
      method: 'GET',
      url: uri + '/pendientes/' + id + '/' + tipo,      
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  /* POST : método para realizar una solicitud, es decir cuando un usuario selecciona a un 
   prestador de servicios y solicita contacto, se envía los id de los dos usuarios.*/
  function postContact(id, payload) {
    return $http({
      method: 'POST',
      url: uri,
      data: payload,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  /* PUT : método para responder a una solicitud de contacto, la solicitud pendiente 
   estado = 0 pendiente 
   estado = 1 acepta 
   estado = 2 rechaza */
  function putContact(payload) {
    return $http({
      method: 'PUT',
      url: uri,
      data: payload,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  service.getActiveContacts = getActiveContacts;
  service.getPending = getPending;
  service.postContact = postContact;
  service.putContact = putContact;
  return service;
};
angular
  .module('ijobApp')
  .factory('ContactsService', ContactsService);

ContactsService.$inject = ['$http'];
