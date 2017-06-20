angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })
.directive('searchResultEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    restrict: 'E',
    controller: function() {
      // console.log(movies);
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});
