'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:RememberCtrl
 * @description
 * # AboutCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('RememberCtrl', function (UserService, $location) {
    var vm = this;
    vm.msg = { className: '', content: '' };
    vm.sended = false;
    var handleError = function(response) {
        console.log('error =>', response);
        vm.msg.content = response.data.error;
        vm.msg.className = 'text-danger';
    }
    
    var handleSuccess = function(response){
        console.log('sucess =>', response);
        vm.sended = true;
        vm.msg.content = response.data.mensaje;
        vm.msg.className = 'text-success';
    };


    vm.remember = function(){
        vm.msg.content = '';
        vm.msg.className = '';
        UserService.RememberPass(vm.email).then(handleSuccess, handleError);
    };
    vm.cancel = function(){
        $location.path('/login');
    };

    
  });
