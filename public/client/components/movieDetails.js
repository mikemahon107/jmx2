angular.module('main-app')

.directive('movieDetails', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      details: '<',
      video: '<',
      imdb: '<'
    },
    controller: function() {
      this.$onInit = function() {
        console.log('this.movie in movieDetails: ', this.movie)
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieDetails.html'
  };
});
