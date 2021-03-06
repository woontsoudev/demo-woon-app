/**
 * Header Nav Directive
 *
 * Directive use:
 * @uses 1 - to use add <header-nav></header-nav> to html file.
 * @uses 2 - Optional parameters:
 * @parameter xxxx              [string :: Add filter by 'type xxxx' value]
 * @example   <header-nav></header-nav>
 */
(function() {

  'use strict';

  angular
    .module('app.layout')
    .directive('headerNav', HeaderNavDrtv);

  function HeaderNavDrtv() {
    return {
      restrict: 'E',
      replace: 'true',
      scope: true,
      templateUrl: 'scripts/layout/header-nav/header-nav.html',
      controller: 'HeaderNavCtrl',
      controllerAs: 'vm'
    };
  }
})();
