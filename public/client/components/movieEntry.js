angular.module('main-app')

.directive('movieEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      details: '<',
      tab: '<',
      handleTitleClick: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB, $http, youTube) {
      this.$onInit = function() {
        this.OMDBService = searchOMDB;
        this.OMDBService.search({i: this.movie.imdb_id}, (data) => {
          this.movie.details = data;
          this.movie.details.Poster === "N/A" || !this.movie.details.Poster ? this.movie.details.Poster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' : this.movie.details.Poster
          this.movie.details.Ratings_Obj = {}
          for (var rating of data.Ratings) {
            this.movie.details.Ratings_Obj[rating.Source] = rating.Value
          }
          var title = this.movie.details.Title;
          title = title.toLowerCase().replace(':','').replace(')','').replace('(','').replace('.','').replace("'",'').replace("'",'').split(' ');
          this.movie.rotten_id = title.join('_');
          this.movie.meta_id = title.join('-');
        });
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
        var idList = this.user.watched.map((x) => x.imdb_id);
        var i = idList.indexOf(this.movie.imdb_id);

        $http.post('/addComment', {user: this.user.username, imdb_id: this.movie.imdb_id, comment: this.input}).then(() => {
          $http.get('/sess').then((session) => {

            this.user.watched[i].comment = session.data.watched[i].comment;
          });
        });
      };

      this.handleRatingClick = function(rating) {
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

      // set trailer for video player on details view

      this.searchResults = (data) => {
        this.video = data[0];
      }

      // need to write a handleTitleClick function that will swap out the query string based on click

      this.handleTitleClick = (title) => {
        console.log('in handle title click', title);
        youTube.search(`${title} official trailer`, this.searchResults);
      }

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
