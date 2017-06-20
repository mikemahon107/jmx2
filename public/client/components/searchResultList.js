angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })
.directive('searchResultList', function() {
  return {
    scope: {
      movies: '<'
    },
    restrict: 'E',
    controller: function() {
      // console.log(movies);
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultList.html'
  };
});

