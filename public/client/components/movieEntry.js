angular.module('main-app') // copied mostly from ng-cast

.directive('movieEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB) {
      this.$onInit = function() {
        this.OMDBService = searchOMDB
        this.OMDBService.search({t: this.movie.details.title, y: this.movie.details.year}, (data) => {
          this.movie.details = data
        })
      };

      this.handleAddCommentClick = function() {
        // console.log(this.movie.title);
        console.log('username', this.user.username);
        // console.log('this', this);
        console.log('movie title', this.movie.details.Title);
        console.log('movie year', this.movie.details.Year);
        console.log('input', this.input);
        // $http.post('/addComment', {user: this.user, movieTitle: this.movie.title});
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieEntry.html'
  };
});
