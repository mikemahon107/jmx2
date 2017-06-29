angular.module('main-app')

.directive('reviews', function() {
  return {
    scope: {
      user: '<'
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

      this.getReviews = function() {
        review.getReviews(imdb_id, function(response) {
          console.log('response in reviews.js get reviews: ', response)
        })
      }

      this.handleTextChange = function(item, review) {
        this.writtenReview = item
      }

      console.log('date: ', date)
      console.log('Date: ', typeof date)

      // dummy data
      this.reviews = [{imdb_id: '1', user: 'mike', rating: '8', date: 'Thu Jun 29 2017 14:27:12 GMT-0500 (CDT)', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah.'}, {imdb_id: '1', user: 'mike', rating: '8', date: 'Thu Jun 29 2017 14:27:12 GMT-0500 (CDT)', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah\
       blahblah blah blah blah \
       blablahblah blah blah.'}]

      this.handleSubmit = function() {
        var date = new Date();
        console.log('this.writtenReview: ', this.writtenReview)
        var newReview = {imdb_id: '1', user: this.user.username, text: this.writtenReview, date: date.toString(), rating: this.rating, score: this.score, upvotes: [], downvotes[]};
        review.postReview(newReview, function(response) {
          console.log('response: ', response)
          this.reviews.push(newReview);
        })
      }


      this.handleRatingClick = function(rating) {
        console.log('this.rating: ', this.rating)
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
