# Sample APP

## Live Demo
[Demo](http://demo-woon-app.herokuapp.com/#/news/list)

## Introduction

For demo proposes this project was created from scratch this means no generators, no project base and not plugins, I only use some files from my own projects.

### Resources

1. [John Papa Angular style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) - Angular arquitecture
2. [Animate.css](https://daneden.github.io/animate.css/) - For animations
3. [Bootstrap](http://getbootstrap.com/) - CSS framework
4. [Moment.js](http://momentjs.com/) - Manage time
5. [Lodash](https://lodash.com/) - Utility library
6. [Toastr](https://github.com/CodeSeven/toastr) - Notifications

## Run the Project

1. First run `npm install` and `bower install`
2. Go to root directory and run `npm start`
3. [http://localhost:5050/#/news/list](http://localhost:5050/#/news/list)

## App overview

- The application gets all the data from the dotCMS API.
- It is Full Responsive (Reload the browser everytime you resize the window).
- The images are processed by the dotCMS API.
- The settings App are working with the API filters.

## How it works?

- At the first look you can see a list of item returned from the server without parameters, only the default data returned are shown. In `app/scripts/components/news/news.module.js` I call the API to get the data without parameters and return it to the view.

```javascript
  function getNews(api) {
    var url = 'content/render/false/type/json/query/+contentType:News%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true';
    return api.get(url);
  }
```

- Use the News filter to change the news list.

```javascript
function getNews(data) {
      var limit = data.limit || 10;
      var display = data.display || 'asc';
      var order = data.orderby || 'sysPublishDate';
      var url = 'content/render/false/type/json/query/+contentType:News%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/News.' + order + ' ' + display + '/limit/' + limit;

      vm.totalItems = limit;

      return api.get(url);
    }
```

- The images displayed are using a thumbnail filter from the API.
```javascript

<div class="media-left media-middle animated fadeInLeft">
    <img class="media-object img-thumbnail" ng-src="http://demo.dotcms.com/contentAsset/image/{{news.imageContentAsset}}/filter/Thumbnail/thumbnail_w/80/thumbnail_h/80/thumbnail_bg/200200200" image-error="http://us.mnrate.com/img/notfound_img.png" alt="...">
</div>
```

- The time returned are processed with moment.js

```javascript
function formatDates(date) {
  var newDate = moment(date).format('MMM DD, YYYY');
  return newDate;
}
```

- The notifications when the data is updated are manages with Toastr

```javascript
function updateNews(data) {
      getNews(data)
        .then(function(res){
          vm.contentlets = res.contentlets;
          vm.displayedItems = findData(vm.contentlets, vm.firstItem, vm.lastItem);
          toastr.success('Success', 'News updated');
          console.log("news updated", {list: vm.contentlets})
        });
    }
```

- The `findData(obj, firstItem, lastItem)` is used to track only the 5 elements in the news object. Here I use lodash to filter the data.

```javascript
function findData(obj, firstItem, lastItem) {
  var arr = [];
  _.forEach(obj, function(value, key) {
    if((key >= firstItem) && (key <= lastItem)) {
      arr.push(value);
    }
  });
  return arr;
}
```

- If a image didn't exist, the directive `imageError` change the src with a placeholder image. `app/scripts/directives/image-error.directive.js`

```
<div class="media-left media-middle animated fadeInLeft">
    <img class="media-object img-thumbnail" ng-src="http://demo.dotcms.com/contentAsset/image/{{news.imageContentAsset}}/filter/Thumbnail/thumbnail_w/80/thumbnail_h/80/thumbnail_bg/200200200" image-error="http://us.mnrate.com/img/notfound_img.png" alt="...">
</div>
```
