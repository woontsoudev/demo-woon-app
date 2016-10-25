/**
 * Header Nav Directive
 *
 * Directive use:
 * @uses 1 - to use add <shell></shell> to html file.
 * @uses 2 - Optional parameters:
 * @parameter xxxx              [string :: Add filter by 'type xxxx' value]
 * @example   <shell></shell>
 */
(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('shell', ShellDirective);

  /* @ngInject */
  function ShellDirective() {

    var directive = {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'scripts/layout/shell/shell.html',
      controller: 'ShellCtrl',
      controllerAs: 'vm'
    };

    return directive;
  }
})();
