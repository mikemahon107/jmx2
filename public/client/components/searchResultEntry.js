angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http, searchTheMovieDB) {
  this.imdb_id;
  this.$onInit = function() {
    this.TMDBservice = searchTheMovieDB
    var watched_ids = []
    for (var movie of this.user.watched) {
      watched_ids.push(movie.imdb_id);
    }
    this.handleMovieClick = function() {
      this.TMDBservice.searchById(this.movie.id, (data) => {
        this.imdb_id = data.imdb_id
        if (watched_ids.includes(data.imdb_id)) {
          alert('You already added this movie to your watch list')
        } else {
          $http.post('/addMovie', {user: this.user.username, imdb_id: this.imdb_id}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.watched = session.data.watched;
            });
          });
        }
      });
    };
  };

})
.directive('searchResultEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl2',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});
