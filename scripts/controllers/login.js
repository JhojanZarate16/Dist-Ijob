'use strict';

angular.module('ijobApp')
  .controller('LoginCtrl', function (LoginService, CryptoService, $location, $rootScope) {
    var vm = this;
    vm.msg = {
      className: '',
      content: ''
    };
    // ferr1280@hotmail.com
    // 94ed1adf3ee76cc4c5a5d389ce63d8f8b39abbd3
    // 94ed1adf3ee76cc4c5a5d389ce63d8f8b39abbd3

    console.log(CryptoService.SHA1.encode('sistem32+'))
    var login = function () {
      vm.msg.className = '';
      vm.msg.content = '';
      var payload = {
        correo: vm.username,
        clave: CryptoService.SHA1.encode(vm.password)
      };
      LoginService.login(payload).then(function (response) {
        handleSuccess(response);
      }, function (response) {
        handleError(response);
      });
    };

    var handleSuccess = function (response) {
      console.log('ok =>', response);
      vm.msg.className = 'text-success';
      vm.msg.content = 'Bienvenido (a) ' + response.data.nombre + '!';
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data['_id']);
      localStorage.setItem('nombre', response.data.nombre);
      localStorage.setItem('apellidos', response.data.apellidos);
      localStorage.setItem('correo', vm.username);

      $rootScope.user = {
        email: vm.username,
        name: response.data.nombre,
        lastName: response.data.apellidos,
        id: response.data['_id'],
        token: response.data.token
      }
      console.log('rootScope', $rootScope);


      $location.path('/profile');
    };

    var handleError = function (response) {
      console.log('error =>', response);
      vm.msg.className = 'text-danger';
      vm.msg.content = response.data.error;
    };
    vm.login = login;
  });
