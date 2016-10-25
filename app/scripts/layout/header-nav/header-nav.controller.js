(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('HeaderNavCtrl', HeaderNavCtrl);

  /* @ngInject */
  function HeaderNavCtrl($log, $state) {

    var vm = this;

    vm.isActive = isActive;

    activate();

    function activate() {
      $log.info('header nav loaded!', {vm: vm});
    }

    function isActive(route) {
      if (!route.state || !$state.current || !$state.current.name) {
        return '';
      }
      var state = route.state;
      return $state.current.name.substr(0, state.length) === state ? true
                                                                   : false;
    }
  }
})();
