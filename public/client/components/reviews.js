angular.module('main-app')

.directive('reviews', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: function() {
      this.rating = '-'
      this.writtenReview = '';
      this.showWriteReview = false;
      this.writeHideReview = "Write Review";
      this.writeReviewClick = function() {
        this.showWriteReview = !this.showWriteReview;
        if (this.showWriteReview) {
          this.writeHideReview = "Hide Review";
        } else {
          this.writeHideReview = "Write Review";
        }
      }

      this.handleTextChange = function(item) {
        this.writtenReview = item
      }

      var date = new Date();
      console.log('date: ', date)
      console.log('Date: ', typeof date)

      // dummy data
      this.reviews = [{user: 'mike', rating: '8', date: 'Thu Jun 29 2017 14:27:12 GMT-0500 (CDT)', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah.'}]

      this.handleSubmit = function() {
        console.log('this.writtenReview: ', this.writtenReview)
      }

      this.handleRatingClick = function(rating) {
        console.log('this.rating: ', this.rating)
        // var idList = this.user.watched.map((x) => x.imdb_id);
        // var i = idList.indexOf(this.movie.imdb_id);

        // $http.post('/editRating', {user: this.user.username, imdb_id: this.movie.imdb_id, rating: this.rating}).then(() => {
        //   $http.get('/sess').then((session) => {
        //     this.user.watched[i].rating = session.data.watched[i].rating;
        //   });
        // });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
