angular.module('main-app')

.controller('BoxOfficeCtrl', function(searchTheMovieDB, searchOMDB, $window) {
  this.results = []
  this.TMDBservice = searchTheMovieDB;
  this.OMDBService = searchOMDB;
  this.weekend = $window.weekendBoxOffice;

  this.searchMovies = (searchStr, earnings) => {
    this.TMDBservice.search(searchStr, (data) => {
      if (data.results.length === 0) {
        var date = new Date(Date.now())
        var year = date.getFullYear();
        var replaceStr = ' ('+year.toString()+')';
        searchStr = searchStr.replace(replaceStr, '');
        this.searchMovies(searchStr, earnings)
      } else {
        data.results.sort((a, b) => {
          if (a.release_date < b.release_date) {
            return 1
          } else if (a.release_date > b.release_date) {
            return -1
          } else {
            return 0
          }
        })
        var result = data.results[0];
        result.weekend_earnings = earnings;
        this.TMDBservice.searchById(result.id, (data) => {
          result.imdb_id = data.imdb_id
          this.results.push(result);
        })
      }
    });
  }

  for (var movie in $window.movies) {
    var earnings = $window.movies[movie]
    this.searchMovies(movie, earnings);
  }

  this.results.map(item => {
    if (item.poster_path === null) {
      item.poster_path = 'http://www.aliciburada.com/assets/image/site/icon-user.png';
    } else {
      item.poster_path = 'http://image.tmdb.org/t/p/w92/' + item.poster_path;
    }
  })


})
.directive('boxOffice', function() {
  return {
    scope: {
      user: '<'
    },
    restrict: 'E',
    controller: 'BoxOfficeCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/boxOffice.html'
  };
});
