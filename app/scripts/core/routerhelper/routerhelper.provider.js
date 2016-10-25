/**
 * @ngDoc provider
 * @name blocks:routeHelperProvider
 * @description routeHelperProvider
 */

/* Help configure the state-base ui.router */
(function() {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

  /* @ngInject */
  function routerHelperProvider($stateProvider, $urlRouterProvider) {

    this.$get = RouterHelper;

    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, $log) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {errors: 0,changes: 0};

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      };

      init();

      return service;
      ///////////////

      function configureStates(states, otherwisePath) {
        states.forEach(function(state) {
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function(event, toState, toParams, fromState, fromParams, error, toastr) {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            var msg = formatErrorMessage(error);
            $log.warn(msg, [toState]);
            toastr.error('some message', 'Routing error');
            $state.go('news.list');

            function formatErrorMessage(error) {
              var dest = (toState && (toState.title || toState.name ||
                toState.loadedTemplateUrl)) || 'unknown target';
              return 'Error routing to ' + dest + '. ' +
                error.message || error.data || '' +
                '. <br/>' + (error.statusText || '') +
                ': ' + (error.status || '');
            }
          }
        );
      }

      function getStates() {
        return $state.get();
      }

      function init() {
        handleRoutingErrors();
      }
    }
  }
})();
