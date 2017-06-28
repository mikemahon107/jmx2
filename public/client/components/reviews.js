angular.module('main-app')

.directive('reviews', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: function() {
      this.showWriteReview = true;
      this.writeReviewClick = function() {
        this.showWriteReview = !this.showWriteReview;
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviews.html'
  };
});
