angular.module('main-app')

.controller('SearchCtrl', function() {
 })
.directive('searchResultList', function() {
  return {
    scope: {
      movies: '<',
      user: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultList.html'
  };
});
