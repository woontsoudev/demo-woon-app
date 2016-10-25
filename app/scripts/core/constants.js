/**
 * @desc: constants of the angular app
 */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('_', _)
    .constant('API_URL', 'http://demo.dotcms.com/api/');
})();
