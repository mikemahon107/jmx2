angular.module('main-app')

.directive('movieDetails', function() {
  return {
    scope: {
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
