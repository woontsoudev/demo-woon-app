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
    .module('app.directives')
    .directive('imageError', imageErrorDrtv);

  function imageErrorDrtv() {
    return {
      link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.imageError) {
              attrs.$set('src', attrs.imageError);
            }
            console.log('worind');
          });
        }
    };
  }
})();
