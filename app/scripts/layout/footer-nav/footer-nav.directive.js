/**
 * Header Nav Directive
 *
 * Directive use:
 * @uses 1 - to use add <footer-nav></footer-nav> to html file.
 * @uses 2 - Optional parameters:
 * @parameter xxxx              [string :: Add filter by 'type xxxx' value]
 * @example   <footer-nav xxxx='test'></footer-nav>
 */
(function() {

  'use strict';

  angular
    .module('app.layout')
    .directive('footerNav', FooterNavDrtv);

  function FooterNavDrtv() {
    return {
      restrict: 'E',
      replace: 'true',
      scope: true,
      templateUrl: 'scripts/layout/footer-nav/footer-nav.html',
      controller: 'FooterNavCtrl',
      controllerAs: 'vm'
    };
  }
})();
