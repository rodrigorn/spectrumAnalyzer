(function () {
  'use strict';
  angular.module('spectrumAnalyzer', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'])
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }
})();




