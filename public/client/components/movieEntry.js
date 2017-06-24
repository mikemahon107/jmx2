angular.module('main-app') // copied mostly from ng-cast

.directive('movieEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB, $http) {
      this.$onInit = function() {
        this.OMDBService = searchOMDB
        this.OMDBService.search({t: this.movie.details.title, y: this.movie.details.year}, (data) => {
          this.movie.details = data
          this.movie.details.Poster === "N/A" || !this.movie.details.Poster ? this.movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.movie.details.Poster
        })

        this.handleAddCommentClick = function() {
          // console.log(this.movie.title);
          // console.log('username', this.user.username);
          // console.log('this', this);
          // console.log('movie title', this.movie.details.Title);
          // console.log('movie year', this.movie.details.Year);
          // console.log('input', this.input);

          // $http.post('/addComment', {user: this.user, movieTitle: this.movie.title});
          $http.post('/addComment', {user: this.user.username, movieTitle: this.movie.details.Title, year: this.movie.details.Year, comment: this.input}).then(() => {
            console.log('trying to add a comment!')
            $http.get('/sess').then((session) => {
              this.user.watched = session.data.watched;
              console.log(this.user, session.data);
            });
          });
        };

        this.handleRemoveClick = function() {
          $http.post('/removeFromWatched', {user: this.user.username, title: this.movie.details.Title, year: this.movie.details.Year}).then(() => {
            $http.get('/sess').then((session) => {
              this.user.watched = session.data.watched;
            });
          });
        };
      };



      // this.$onInit = function() {
      //   this.handleMovieClick = function() {
      //     $http.post('/addMovie', {user: this.user.username, movieTitle: this.movie.title, year: this.movie.release_date.split('-')[0]}).then(() => {
      //       $http.get('/sess').then((session) => {
      //         this.user.watched = session.data.watched;
      //       });
      //     });

      //   }
      // // console.log('search entry this', this);
      //   // body...
      // }

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieEntry.html'
  };
});
