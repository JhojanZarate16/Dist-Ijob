'use strict';


angular.module('ijobApp').controller('ProfileCtrl', function ($location, ProfileService, UserService,
  CommonService, $rootScope, $filter) {
  var vm = this;

  if (!$rootScope.user.id) $location.path('/')

  vm.defaultImage = '/images/avatar_male.png';
  vm.Roles = CommonService.Roles;
  vm.MetodoRegistro = CommonService.MetodoRegistro;
  vm.Genero = CommonService.Genero;
  vm.ubicaciones = [];
  vm.escolaridad = [];
  vm.ocupaciones = [];
  vm.estados = [];
  vm.sectores = [];
  vm.msg = {
    success: null,
    error: null
  };

  var id = localStorage.getItem('id');
  console.log('token', localStorage.getItem('token'));

  var getUserInfo = function () {
    vm.dataLoading = true;
    UserService.GetById(id).then(handleGetSuccess, handleGetError);
  };

  var getUbicaciones = function () {
    CommonService.getUbicaciones().then(function (response) {
        vm.ubicaciones = response.data;
      },
      function (response) {
        console.log('error ubicaciones =>', response)
      });
  };

  var getSectores = function () {
    CommonService.getSectores().then(function (response) {
        vm.sectores = response.data;
      },
      function (response) {
        console.log('error sectores =>', response)
      });
  };

  var getEscolaridad = function () {
    CommonService.getEscolaridad().then(function (response) {
        vm.escolaridad = response.data;
      },
      function (response) {
        console.log('error escolaridad =>', response)
      });
  };

  var getEstados = function () {
    CommonService.getEstados().then(function (response) {
        vm.estados = response.data; // codigo & nombre
      },
      function (response) {
        console.log('error getEstados =>', response)
      });
  };

  var getOcupaciones = function () {
    CommonService.getOcupaciones().then(function (response) {
        vm.ocupaciones = response.data;
      },
      function (response) {
        console.log('error escolaridad =>', response)
      });
  };

  var updateUser = function () {
    //1. general info
    var userLocation = $filter('filter')(vm.ubicaciones, {
      municipio: vm.user.ciudad
    })[0];
    console.log('user a actualizar =>', vm.user);
    var payload = {
      nombre: vm.user.nombre,
      apellidos: vm.user.apellidos,
      correo: vm.user.correo,
      nacimiento: vm.user.nacimiento,
      genero: vm.user.genero,
      cedula: vm.user.cedula,
      _ubicacion: userLocation
    };

    UserService.Update(payload, id)
      .then(function (response) {
        vm.msg.error = null;
      })
      .then(function (response) {
        if (response) vm.msg.error = 'Error actualizando la información básica';
      });

    //2. description
    UserService.UpdateDescripcion(id, vm.user.descripcion)
      .then(function (response) {})
      .then(function (response) {
        if (response) vm.msg.error = 'Error actualizando la descripción del usuario';
      });

    // 3. Disponibilidad
    UserService.updateDisponibilidad(id, vm.user.disponible)
      .then(function (response) {})
      .then(function (response) {
        if (response) vm.msg.error = 'Error actualizando la disponibilidad del usuario';
      });

    //4. ocupaciones
    angular.forEach(vm.user.ocupaciones, function (value, key) {
      console.log('actualizando ocupacion', value);
      var userOcupation = $filter('filter')(vm.ocupaciones, {
        _id: value.idOcupacion
      })[0];
      console.log('filtrada =>', userOcupation);
      var payload = {
        ocupacion: userOcupation,
        experiencia: value.experiencia,
        cursos: value.cursos,
        tipo: value.tipo,
        _id: value._id
      };
      UserService.UpdateOcupacion(id, payload)
        .then(function (response) {
          console.log('sucess update ocupación =>', response)

        })
        .then(function (response) {
          console.log('error update descripcion =>', response)
          if (response) vm.msg.error = 'Error actualizando la ocupación del usuario';
        });

    });


    //5. imagen
    if (vm.user.image) {
      UserService.UpdateImage(id, vm.user.image)
        .then(function (response) {
          console.log('sucess update image =>', response)
        })
        .then(function (response) {
          console.log('error update image  =>', response)
          if (response) vm.msg.error = 'Error actualizando la imagen del usuario';
        });
    }

    if (!vm.msg.error)
      vm.msg.success = 'Usuario actualizado con éxito';
  };

  var handleGetSuccess = function (response) {
    console.log('user =>', response.data);
    vm.dataLoading = false;
    vm.user = response.data;
    vm.user.nacimiento = moment(response.data.nacimiento).toDate();
    vm.user.genero = response.data.genero.toString();
    
    vm.user.canAddOcupacion = response.data.estado === 3 || response.data.estado === 4;
    vm.user.canAddDispobilidad = response.data.estado === 3 || response.data.estado === 4 || response.data.estado === 5;
    vm.user.disponible = response.data.estado === 4;
    UserService.GetUserImage(vm.user['_imagen']) //.then(function(response){      
      vm.image  = 'data:image/JPEG;base64,'+response.data;
    //});
    getNombreEstado();
    if (response.data._ubicacion) {
      vm.user.departamento = response.data._ubicacion.departamento;
      vm.user.ciudad = response.data._ubicacion.municipio;
    }

    var items = response.data.ocupaciones;
    vm.user.ocupaciones = [];
    angular.forEach(items, function (value, key) {
      var item = value;
      item.idOcupacion = value._ocupacion ? value._ocupacion._id : null;
      vm.user.ocupaciones.push(item);
    });
  };
  var handleGetError = function (response) {
    console.log('error =>', response);
    vm.dataLoading = true;
  };

  var DeleteOcupacion = function (ocupacion) {
    var index = vm.user.ocupaciones.indexOf(ocupacion);
    if (!ocupacion._id) {
      vm.user.ocupaciones.splice(index, 1);
    } else {

      UserService.deleteOcupacion(id, ocupacion._id).then(function (response) {
        console.log('ok delete ocupacion', response);
        vm.user.ocupaciones.splice(index, 1);
      }, function (response) {
        console.log('error', response);
      })

    }


  };

  var getNombreEstado = function () {
    var estadosList = vm.estados;
    var userStatus = $filter('filter')(estadosList, {
      codigo: vm.user.estado
    })[0];
    vm.user.Status = userStatus;
  }


  vm.getUserInfo = getUserInfo;
  vm.updateUser = updateUser;
  vm.deleteOcupacion = DeleteOcupacion;
  vm.addOcupacion = function () {
    vm.user.ocupaciones.push({});
  };

  getUserInfo(id);
  getUbicaciones();
  getEscolaridad();
  getOcupaciones();
  getEstados();
  getSectores();
});
