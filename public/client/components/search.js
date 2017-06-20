angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })

.controller('SearchController', function() {
  console.log('out', this.searchResult);
  this.handleClick = () => {
    this.service.search({t: this.input}, (data) => {
      // this.searchResult.push(data)
      console.log(data);
    })
  }
})
    // this.service.search(this.input, (data) => {
    //   console.log('we are in', data);
.directive('search', function() {
  return {

    scope: {
      service: '<',
      searchResult: '<'
    },
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/search.html'
      };
});

// .directive('search', function() {
//   return {
//     scope: {},
//     restrict: 'E',
//     // controller: 'SearchCtrl',
//     // controllerAs: 'ctrl',
//     // bindToController: true,
//     templateUrl: 'public/client/templates/search.html'
//   };
// });

