angular.module('main-app')

.directive('reviews', function() {
  return {
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
        review.getReviews('1', (response) => {
          console.log('in get reviews')
          this.reviews = response.data;
        })
      }

      this.getReviews();

      // this.handleTextChange = function(item) {
      //   console.log("this.writtenReview: ", this.writtenReview)
      // }


      // dummy data
      // this.reviews = [{imdb_id: '1', user: 'mike', rating: '8', date: 'Thu Jun 29 2017 14:27:12 GMT-0500 (CDT)', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah.'}, {imdb_id: '1', user: 'mike', rating: '8', date: 'Thu Jun 29 2017 14:27:12 GMT-0500 (CDT)', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah\
      //  blahblah blah blah blah \
      //  blablahblah blah blah.'}]

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

      // this.handleRatingClick = function(rating) {
      //   console.log('this.rating: ', this.rating)
      // };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
