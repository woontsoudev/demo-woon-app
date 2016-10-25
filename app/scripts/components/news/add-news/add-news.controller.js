/**
 * @ngdoc controller
 * @name app.components.news.controller:NewsAddCtrl
 * @requires logger
 * @description Controller of the app
 */

(function() {
  'use strict';

  angular
    .module('app.components.news')
    .controller('NewsAddCtrl', NewsAddCtrl);

  /* @ngInject */
  function NewsAddCtrl($log) {

    var vm = this;

    activate();
    ///////////

    function activate() {
      $log.info('Activated Add News View', { vm: vm });
    }
  }
})();
