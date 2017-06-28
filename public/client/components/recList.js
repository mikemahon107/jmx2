angular.module('main-app')
.directive('recList', function() {
  return {
    scope: {
      movies: '<',
      user: '<',
      handleTitleClick: '<'
    },
    restrict: 'E',
    controller: function() {
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recList.html'
  };
});
