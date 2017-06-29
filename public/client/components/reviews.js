angular.module('main-app')

.directive('reviews', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: function() {
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

      // dummy data
      this.reviews = [{user: 'mike', rating: 8, date: '2012-06-30', score: 0, text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah.'}]

      this.handleSubmit = function() {
        console.log('this.writtenReview: ', this.writtenReview)
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
