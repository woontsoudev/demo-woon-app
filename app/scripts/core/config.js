(function () {
  'use strict';

  var core = angular.module('app.core');
  var config = {
    version: '0.0.1',
    appTitle: 'SimpleApp'
  };
  core.value('config', config);

  /* @ngInject */
  function toastrOptions(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }
  core.config(toastrOptions);


  /* @ngInject */
  function configure($urlRouterProvider, $httpProvider) {//$httpProvider
    $httpProvider
    // http authentification interceptors
      .interceptors.push('httpInterceptor');

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('news/list');

  }
  core.config(configure);

})();
