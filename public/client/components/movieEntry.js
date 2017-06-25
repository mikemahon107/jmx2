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
        this.OMDBService.search({i: this.movie.imdb_id}, (data) => {
          this.movie.details = data
          this.movie.details.Poster === "N/A" || !this.movie.details.Poster ? this.movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.movie.details.Poster
        })
      };
      

      this.handleAddToFavorites = function() {
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addFavorite', {user: this.user.username,
        movie: this.user.watched[idList.indexOf(this.movie.imdb_id)]}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched[i].isFavorite = session.data.watched[i].isFavorite;
          });
        });

      };

      this.handleAddCommentClick = function() {
        // console.log(this.movie.title);
        // console.log('username', this.user.username);
        // console.log('this', this);
        // console.log('movie title', this.movie.details.Title);
        // console.log('movie year', this.movie.details.Year);
        // console.log('input', this.input);
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        // $http.post('/addComment', {user: this.user, movieTitle: this.movie.title});
        $http.post('/addComment', {user: this.user.username, imdb_id: this.movie.imdb_id, comment: this.input}).then(() => {
          console.log('trying to add a comment!')
          $http.get('/sess').then((session) => {
            this.user.watched[i].comment = session.data.watched[i].comment;
            // console.log('Movie is: ', this.movie, 'User is: ', this.user);
            // //fruits.indexOf("Apple")
            // console.log('the ids in movies are: ', this.user.watched.map((x) => x.imdb_id))
            // console.log('the watched index of the movie is: ', this.user.watched.map((x) => x.imdb_id).indexOf(this.movie.imdb_id));
          });
        });
      };

      this.handleRatingClick = function(rating) {
        console.log('username', this.user.username);
        console.log('this', this);
        console.log('movie title', this.movie.details.Title);
        console.log('movie year', this.movie.details.Year);
        console.log('input this is a log', this.rating);
        console.log('THE TRUE RATING IS ', rating)
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/editRating', {user: this.user.username, imdb_id: this.movie.imdb_id, rating: this.rating}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched[i].rating = session.data.watched[i].rating;
          });
        });
      };

      this.handleRemoveClick = function() {
        $http.post('/removeFromWatched', {user: this.user.username, imdb_id: this.movie.imdb_id}).then(() => {
          $http.get('/sess').then((session) => {
            this.user.watched = session.data.watched;
          });
        });
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
