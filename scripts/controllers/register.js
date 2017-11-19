'use strict';


angular.module('ijobApp')
  .controller('RegisterCtrl', function (UserService, $location, CryptoService, CommonService) {
    var vm = this;
    vm.Roles = CommonService.Roles;
    vm.MetodoRegistro = CommonService.MetodoRegistro;
    vm.Genero = CommonService.Genero;
    vm.msg = { className: '', content: '' };
    var register = function() {
      vm.msg.msg = '';
      vm.msg.className = '';
      vm.dataLoading = true;
      vm.user.clave = CryptoService.SHA1.encode(vm.user.clave).toString();
      vm.user.metodoRegistro = 4;
      UserService.Create(vm.user).then( function (response) {handleSuccess(response);}, function(response) { handleError(response); });
    };

    var handleSuccess = function (response)  {      
      console.log('ok =>', response);
      if (response && response.data.token) {               
        vm.msg.className = 'text-success';
        vm.msg.content = response.data.mensaje;
        vm.token = response.data.token;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data['_id']);
        $location.path('/login');
      }       
      vm.dataLoading = false;
    };

    var handleError = function (response){   
      console.log('error =>', response);   
      vm.dataLoading = false;
      vm.msg.className = 'text-danger';
      vm.msg.content = response.data.error;
    };
    vm.register = register;
  });
