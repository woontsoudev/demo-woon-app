(function () {
  'use strict';

  angular
    .module('blocks.api')
    .factory('api', api);

  /* @ngInject */
  function api($q, $http, API_URL, $httpParamSerializer, $log) {

    var basePath = API_URL;

    function makeRequest(verb, uri, data) {
      $log.log('api :: ' + verb + ' :: ' + uri, data);
      var defer = $q.defer();
      verb = verb.toLowerCase();

      //start with the uri
      var httpArgs = [basePath + uri];
      if (verb.match(/post|put/)) {
        httpArgs.push(data);
      }

      $http[verb].apply(null, httpArgs)
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (data, status) {
            defer.reject(data);
          });

      return defer.promise;
    }

    return {
      get: function (uri, params) {
        var qs = (params && !_.isEmpty(params)) ? '/?' + $httpParamSerializer(params) : '';
        return makeRequest('get', uri + qs);
      },
      post: function (uri, data) {
        return makeRequest('post', uri, data);
      },
      put: function (uri, data) {
        return makeRequest('put', uri, data);
      },
      delete: function (uri) {
        return makeRequest('delete', uri);
      }
    };
  }
})();
