angular.module('main-app')

.directive('movieDetails', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      details: '<',
      video: '<'
    },
    controller: function() {

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieDetails.html'
  };
});
