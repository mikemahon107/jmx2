angular.module('main-app')
.controller('upcomingController', function($http, searchOMDB, searchTheMovieDB) {
  this.movies = []
  this.OMDBService = searchOMDB
  $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=4d3017fc8de9100e02bc619b7791f472&language=en-US&page=1').then((data) => {
    this.movies = data.data.results;
  })
})
.directive('upcomingList', function() {
  return {
    scope: {
      handleTitleClick: '<',
      video: '<',
      movies: '<'
    },
    restrict: 'E',
    controller: 'upcomingController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/upcomingList.html'
  };
});
