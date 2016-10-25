/**
 * @ngdoc controller
 * @name app.layout.controller:ShellCtrl
 * @requires $log
 * @description Controller of the app
 */

(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellCtrl', ShellCtrl);

  /* @ngInject */
  function ShellCtrl($log) {

    var vm = this;

    activate();
    ///////////

    function activate() {
      $log.info(' UI loaded!', {
        vm:vm
      });
    }
  }
})();
