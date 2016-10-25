/**
 * @ngdoc module
 * @name app.components
 * @description define components's modules
 */

(function() {
  'use strict';

  angular
    .module('app.components.news', [])
    .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

    /* @ngInject */
    function getNews(api) {
      var url = 'content/render/false/type/json/query/+contentType:News%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true';
      return api.get(url);
    }

    function getStates() {
      return [
        {
          state: 'news',
          config: {
            absract: true,
            template: '<ui-view class="shuffle-animation"/>',
            url: '/news'
          }
        },
        {
          state: 'news.add',
          config: {
            url: '/add',
            templateUrl: 'scripts/components/news/add-news/add-news.html',
            controller: 'NewsAddCtrl',
            controllerAs: 'vm',
            title: 'Add news'
          }
        },
        {
          state: 'news.list',
          config: {
            url: '/list',
            templateUrl: 'scripts/components/news/list-news/list-news.html',
            controller: 'NewsListCtrl',
            controllerAs: 'vm',
            title: 'News list',
            resolve: {
              NewsList: getNews
            }
          }
        }
      ];
    }
})();
