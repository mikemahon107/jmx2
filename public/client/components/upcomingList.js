angular.module('main-app')
.controller('upcomingController', function($http, searchOMDB, searchTheMovieDB) {
  this.movies = [];
  this.OMDBService = searchOMDB
  $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=4d3017fc8de9100e02bc619b7791f472&language=en-US&page=1').then((data) => {
    var now = new Date();
    var release;
    for (var movie of data.data.results) {
      release = new Date(movie.release_date)
      if (release > now) {
        this.movies.push(movie)
      }
    }
  })
})
.directive('upcomingList', function() {
  return {
    scope: {
      handleTitleClick: '<',
      video: '<'
    },
    restrict: 'E',
    controller: 'upcomingController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/upcomingList.html'
  };
});
