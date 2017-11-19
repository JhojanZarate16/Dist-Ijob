'use strict';

/**
 * @ngdoc overview
 * @name ijobApp
 * @description
 * # ijobApp
 *
 * Main module of the application.
 */
angular
  .module('ijobApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngRoute',
    'ngFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm'
      })
      .when('/remember', {
        templateUrl: 'views/remember.html',
        controller: 'RememberCtrl',
        controllerAs: 'vm'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'vm'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl',
        controllerAs: 'vm'
      })
      .when('/qualification', {
        templateUrl: 'views/qualification.html',
        controller: 'QualificationCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope) {
    $rootScope.test = new Date();   
  });
