/**
 * @ngdoc module
 * @name app.core
 * @description define components's modules
 */

(function() {
  'use strict';

  angular
    .module('app.core', [
      // angular modules
      'ngSanitize', 'ngAnimate', 'ngMessages',

      //
      'blocks.api', 'blocks.httpInterceptor', 'blocks.router',
      // 3rd party modules
      'ui.router'
    ]);

})();
