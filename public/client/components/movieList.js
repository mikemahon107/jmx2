angular.module('main-app')

.directive('movieList', function() {
  return {
    scope: {
      movies: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function() {
      console.log('this.movies: ', this)
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieList.html'
  };
});
