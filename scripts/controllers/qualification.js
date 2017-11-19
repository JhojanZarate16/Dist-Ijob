'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('QualificationCtrl', function (UserService, QualificationService) {
    var vm = this;
    vm.qualifications = { done: [], pending: [], received:[]};


    var getItems = function(page, type){
        var payload = { page: page, type: type};
        QualificationService.get(payload).then(function(response){
            console.log('response', response);
            if(type === 1){
                if(response.data.codigo) vm.doneMessage = response.data.mensaje;
                else{
                    vm.qualifications.done = response.data;
                }
            }

            if(type === 2){
                if(response.data.codigo)
                { 
                    vm.receivedMessage = response.data.mensaje;
                }
                else{
                    vm.qualifications.received = response.data;
                }

            }

        }, function(response){});
    };

    var getPending = function(page){
        var payload = { page: page};
        QualificationService.getPending(payload).then(function(response){
            console.log('response', response);
            if(response.data.codigo) vm.pendingMessage = response.data.mensaje;
            else{
                vm.qualifications.pending = response.data;
            }

        }, function(response){});
    };

    vm.qualify = function(item){
        var payload = { respeto : vm.respect, 
                        puntualidad: vm.punctuality, 
                        orientacion: vm.orientation,
                        idCalificacion: item._id,
                        calidad : vm.quality
                    };
        var isValid = false;
        if( item.tipoCalificacion === 2) isValid = vm.respect && vm.punctuality && vm.orientation;
        if( item.tipoCalificacion === 1) isValid = vm.respect && vm.punctuality && vm.quality;

        if(isValid){

            QualificationService.qualify(payload).then(function(response){
                console.log(response);
                if(response.data) vm.qualify.message = response.data.message;
            }, function(){ });
        }
        else{ alert('Debe indicar la calificación del usuario'); }
        

    }

    getItems(1,1); // done
    getItems(1,2); // received
    getPending(1); // pending

  });

