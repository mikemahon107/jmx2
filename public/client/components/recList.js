angular.module('main-app') // copied mostly from ng-cast
.directive('recList', function() {
  return {
    scope: {
      movies: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = function() {
        console.log(this.movies)
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recList.html'
  };
});
