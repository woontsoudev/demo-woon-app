/**
 * @ngdoc controller
 * @name app.components.news.controller:NewsListCtrl
 * @requires logger
 * @description Controller of the app
 */

(function() {
  'use strict';

  angular
    .module('app.components.news')
    .controller('NewsListCtrl', NewsListCtrl);

  /* @ngInject */
  function NewsListCtrl($log, api, API_URL, NewsList, _, moment) {

    var vm = this;
    vm.itemsPerPage = 5;
    vm.firstItem = 0;
    vm.lastItem = vm.firstItem + (vm.itemsPerPage - 1);
    vm.totalItems = NewsList.contentlets.length;
    vm.contentlets = NewsList.contentlets;
    vm.defaultItem = NewsList.contentlets[0];
    vm.displayedItems = findData(vm.contentlets, vm.firstItem, vm.lastItem);
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    vm.avtiveItem = 0;
    vm.selectItem = selectItem;
    vm.formatDates = formatDates;
    vm.updateNews = updateNews;
    vm.activeSidebar = true;
    vm.backToMenu = backToMenu;

    activate();
    ///////////

    function activate() {
      $log.info('Activated List News View', { vm: vm });
    }

    function findData(obj, firstItem, lastItem) {
      var arr = [];
      _.forEach(obj, function(value, key) {
        if((key >= firstItem) && (key <= lastItem)) {
          arr.push(value);
        }
      });
      return arr;
    }

    function nextPage() {
      vm.firstItem += vm.itemsPerPage;
      vm.lastItem += vm.itemsPerPage;
      vm.displayedItems = findData(vm.contentlets, vm.firstItem, vm.lastItem);
    }

    function prevPage() {
      vm.firstItem -= vm.itemsPerPage;
      vm.lastItem -= vm.itemsPerPage;
      vm.displayedItems = findData(vm.contentlets, vm.firstItem, vm.lastItem);
    }

    function updateNews(data) {
      getNews(data)
        .then(function(res){
          vm.contentlets = res.contentlets;
          vm.displayedItems = findData(vm.contentlets, vm.firstItem, vm.lastItem);
          toastr.success('Success', 'News updated');
          console.log("news updated", {list: vm.contentlets})
        });
    }

    function selectItem(id, index) {
     vm.currentItem =  _.filter(vm.contentlets, ['inode', id]);
     vm.avtiveItem = index;
     vm.activeSidebar = false;
    }

    function formatDates(date) {
      var newDate = moment('2016-01-29 15:13:20.844').format('MMM DD, YYYY');

      return newDate;
    }

    function backToMenu() {
      vm.activeSidebar = true;
    }

    function getNews(data) {
      var limit = data.limit || 10;
      var display = data.display || 'asc';
      var order = data.orderby || 'sysPublishDate';
      var url = 'content/render/false/type/json/query/+contentType:News%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/News.' + order + ' ' + display + '/limit/' + limit;

      vm.totalItems = limit;

      return api.get(url);
    }
  }
})();
