(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('FooterNavCtrl', FooterNavCtrl);

  /* @ngInject */
  function FooterNavCtrl($log, $state) {

    var vm = this;

    vm.someTitle = 'Simple App';

    activate();

    function activate() {
      $log.info('footer nav loaded!', {vm: vm});
    }

  }
})();
