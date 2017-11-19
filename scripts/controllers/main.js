'use strict';

/**
 * @ngdoc function
 * @name ijobApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ijobApp
 */
angular.module('ijobApp')
  .controller('MainCtrl', function (SearchService, UserService) {
    var vm = this; 
    var id = localStorage.getItem('id');
    console.log(id);
    var simpleSearch = function () {
      vm.advanced = false;
      vm.searchResult = '';
      vm.jobs = [];
      SearchService.search().then(function (response) {
        console.log('response =>', response);
        mapResult(response);
      });
    };
    var mapResult = function (response) {
      if (response.data.codigo) {
        if (response.data.codigo === 204) {vm.searchResult = response.data.mensaje;}
      } else {
        vm.jobs = response.data;
        angular.forEach(vm.jobs, function (job, key) {
          job.since = sinceFormat(job.creado);
          job.creadoEn = moment(job.creado).format('YYYY-MM-DD hh:mm a');
          job.requestText = 'Hacer solicitud';
          if (job._imagen) {
            job.srcImage = UserService.GetUserImage(job._imagen);
          } else {
            job.srcImage = '/images/avatar_male.png';
          }
        });
      }

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

    if(id){ simpleSearch();}


  });
