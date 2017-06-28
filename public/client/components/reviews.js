angular.module('main-app')

.directive('reviews', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: function() {
      this.review = ''
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
        this.review = item
      }

      this.handleSubmit = function() {
        console.log('this.review: ', this.review)
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
