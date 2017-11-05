'use strict';



var CalificationsService = function ($http) {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/calificaciones';

  function getDoneCalifications(user, id, pagina, tipo) {
    return $http({
      method: 'GET',
      url: uri + '/realizadas/' + id + '/' + pagina + '/' + tipo,
      data: user,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  function getPending(user, id, pagina) {
    return $http({
      method: 'GET',
      url: uri + '/pendientes/' + id + '/' + pagina,
      data: user,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  function updateCalification(user, id, pagina) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/' + pagina,
      data: user,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  };

  service.getDoneCalifications = getDoneCalifications;
  service.getPending = getPending;
  service.updateCalification = updateCalification;
  return service;
};
angular
  .module('ijobApp')
  .factory('CalificationsService', CalificationsService);

  CalificationsService.$inject = ['$http'];
