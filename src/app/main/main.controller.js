(function () {
  'use strict';

  angular
    .module('spectrumAnalyzer')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['mic'];
  function MainCtrl (mic) {
    var vm = this;
  }
})();





