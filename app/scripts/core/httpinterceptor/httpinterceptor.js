(function() {
  'use strict';

  angular
    .module('blocks.httpInterceptor')
    .factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($rootScope, $injector, $q) {
    return {
      request: function(config) {
        $rootScope.$emit('httpInProgressOn', {
          msg: 'its working on request'
        });

        return config || $q.when(config);
      },
      response: function(response) {
        $rootScope.$emit('httpInProgressOff', {
          msg: 'its working on response'}
        );

        return response || $q.when(response);
      },
      responseError: function (response) {
        var kill = false;

        if (response && response.status === 401) {
          kill = true;
        } else if (response && response.status === 500) {
          kill = true;
        }

        if (kill) {
          // do something
          return;
        }

        return $q.reject(response);
      }
    };
  }
})();
