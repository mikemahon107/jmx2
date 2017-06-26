angular.module('main-app') // copied mostly from ng-cast

.directive('upcomingEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = function() {
        this.movie.poster_path =  'http://image.tmdb.org/t/p/w500/' + this.movie.poster_path
        this.movie.release_date = this.movie.release_date.split('-').join('/')
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/upcomingEntry.html'
  };
});
