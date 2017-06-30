angular.module('main-app')

.directive('reviews', function() {
  return {
    // must have imdb_id in scope
    scope: {
      user: '<'
    },
    restrict: 'E',
    controller: function(review) {
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

      this.getReviews = function() {
        // change '1' once in movie view to imdb_id
        review.getReviews('1', (response) => {
          this.reviews = response.data;
        })
      }

      this.getReviews();

      this.handleSubmit = function() {
        if (this.writtenReview.trim() === '') {
          alert('Your review sucks, write something before submitting')
        } else if (this.rating === '-') {
          alert('Must give a rating, before submitting')
        } else {
          var date = new Date();
          var newReview = {imdb_id: '1', user: this.user.username, text: this.writtenReview, date: date.toString(), rating: this.rating, score: 0, upvotes: [], downvotes: []};
          review.postReview(newReview, (response) => {
            alert('Your review was successfully submitted')
            this.reviews.push(newReview);
            this.writtenReview = '';
            this.rating = '-'
          })
        }
      }

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
