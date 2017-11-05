'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:SearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('SearchCtrl', function (SearchService, UserService, CommonService) {
    var vm = this;
    var id = localStorage.getItem('id');
    vm.search = {};
    vm.searchResult = null;
    vm.advanced = false;
    vm.ubicaciones = [];
    vm.escolaridad = [];
    vm.ocupaciones = [];
    vm.estados = [];
    vm.sectores = [];
    vm.jobs = [];
    var simpleSearch = function () {
        vm.advanced = false;
        vm.searchResult = '';
        vm.jobs = [];
      SearchService.search().then(function (response) {
        mapResult(response);
      })
    };

    var advancedSearch = function () {
      vm.advanced = true;
      vm.searchResult = '';
      vm.jobs = [];
      var payload = {
        ocupacion: vm.search.idOcupacion,
        categoria: vm.search.idSector,
        ciudad: vm.search.ciudad,
        calificacion: vm.search.calificacion,
        jornada: "",
        horario: "",
        pagina: 1
      };

      SearchService.adSearch(id, payload).then(function (response) {
        console.log('advanced', response);
        mapResult(response);
      });


    };
    vm.searchJobs = simpleSearch;
    vm.advancedSearch = advancedSearch;
    vm.advancedSearchInit = function(){
        vm.advanced = true;
    };
    var sinceFormat = function (creado) {
      var a = moment(creado);
      var days = a.diff(moment(), 'days') * -1;
      var hours = a.diff(moment(), 'hours') * -1;
      var years = a.diff(moment(), 'years') * -1;
      var since = '';
      if (years > 0 && days > 0) {
        since = 'Hace más de un año';
      } else if (days > 30) {
        since = 'Hace más de un mes';
      } else if (days <= 30) {
        since = 'Hace ' + days + ' día(s) y ' + hours + ' horas'
      }
      return since;
    };

    var mapResult = function (response) {
      if (response.data.codigo) {
        if (response.data.codigo === 204) vm.searchResult = response.data.mensaje;
      } else {
        vm.jobs = response.data;
        angular.forEach(vm.jobs, function (job, key) {
          job.since = sinceFormat(job.creado);
          job.creadoEn = moment(job.creado).format('YYYY-MM-DD hh:mm a');
          if(job._imagen){
              job.srcImage = UserService.GetUserImage(job._imagen);
          }
          else{
            job.srcImage =  '/images/avatar_male.png';
          }
        });
      }

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
      getUbicaciones();
      getEscolaridad();
      getOcupaciones();
      getEstados();
      getSectores();
  });
