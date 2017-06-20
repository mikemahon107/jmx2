angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })
.directive('search', function() {
  return {
    scope: {},
    restrict: 'E',
    // controller: 'SearchCtrl',
    // controllerAs: 'ctrl',
    // bindToController: true,
    templateUrl: 'public/client/templates/search.html'
  };
});

