angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })

.controller('SearchController', function() {
  this.handleClick = () => {
    console.log(this.input);
  };
})
.directive('search', function() {
  return {

    scope: {},
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

