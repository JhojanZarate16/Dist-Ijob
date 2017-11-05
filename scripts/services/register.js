'use strict';

var UserService = function ($http, Upload) {
  var service = {};
  var uri = 'http://vmijob.cloudapp.net/api/usuarios';


  function GetAll() {
    return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
  }

  function GetById(id) {
    return $http({
      method: 'GET',
      url: uri + '/' + id,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  }

  function GetUserImage(idImage) {
    //return $http.get('http://vmijob.cloudapp.net/img/usuarios/imagen/' + idImage);
    return 'http://vmijob.cloudapp.net/img/usuarios/imagen/' + idImage;
  }



  function GetByUsername(username, password) {
    return $http.post(uri + '/autenticar', {
      correo: username,
      clave: password
    }).then(handleSuccess, handleError);
  }

  function GetUserByID(userid) {
    return $http.get(uri + userid).then(handleSuccess, handleError);
  }

  function GetRoles() {
    return $http.get('http://vmijob.cloudapp.net/api/usuario-roles/').then(handleSuccess, handleError);
  }

  function Create(user) {
    return $http.post(uri, user);
  }

  function RememberPass(email) {
    return $http.post(uri + '/recordar', {
      correo: email
    });
  }

  function Update(user, id) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/personal',
      data: user,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  }

  function UpdateDescripcion(id, description) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/descripcion',
      data: {
        descripcion: description
      },
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      }
    });
  }

  function UpdateImage(id, image) {
    return Upload.upload({
      method: 'PUT',
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')
      },
      url: uri + '/' + id + '/imagen',
      data: {
        imagenUsuario: image
      },
    });
  }

  function UpdateDescripcion(id, description) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/descripcion',
      data: {
        descripcion: description
      },
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')       
      }
    });
  }

  function UpdateDisponibilidad(id, dispobilidad) {
    return $http({
      method: 'PUT',
      url: uri + '/' + id + '/disponible',
      data: {
        disponible: dispobilidad
      },
      headers: {
        'authorization': "bearer " + localStorage.getItem('token')       
      }
    });
  }

  function UpdateOcupacion(id, payload) {
    var type = payload._id ? 'PUT' : 'POST'; 
    if(type === 'PUT') payload.idOcupacion = payload._id;    
    return $http({
      method: type,
      url: uri + '/' + id + '/ocupacion',
      data: payload,
      headers: {
        'authorization': "bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
  }

  function Delete(id) {
    return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
  }

  // private functions
  function handleSuccess(res) {
    return res.data;
  }

  function handleError(error) {
    return function () {
      return {
        success: false,
        message: error.data.mensaje
      };
    };
  }

  function DeleteOcupacion(id, idOcupacion) {
    console.log('id', id);
    console.log('idocupacion', idOcupacion);
    return $http({
      method: 'DELETE',
      url: uri + '/' + id + '/ocupacion',
      data: {
        idOcupacion: idOcupacion
      },
      headers: {
        'authorization': "bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
  }

  service.updateDisponibilidad = UpdateDisponibilidad;
  service.deleteOcupacion = DeleteOcupacion;
  service.GetAll = GetAll;
  service.GetById = GetById;
  service.GetByUsername = GetByUsername;
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;
  service.GetUserByID = GetUserByID;
  service.GetRoles = GetRoles;
  service.RememberPass = RememberPass;
  service.UpdateDescripcion = UpdateDescripcion;
  service.UpdateOcupacion = UpdateOcupacion;
  service.UpdateImage = UpdateImage;
  service.GetUserImage = GetUserImage;
  return service;
};

angular.module('ijobApp').factory('UserService', UserService);

UserService.$inject = ['$http', 'Upload'];
