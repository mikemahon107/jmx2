angular.module('main-app')

.directive('reviewEntry', function() {
  return {
    scope: {
      review: '='
    },
    restrict: 'E',
    controller: function() {
      this.$onInit = () => {
        this.text = this.review.text.slice(0,100).concat('...');
      }
      this.showMoreLessText = 'Show More'
      this.showMore = true
      this.toggleTextLength = () => {
        this.showMore = !this.showMore;
        if (this.showMore) {
          this.showMoreLessText = 'Show More';
          this.text = this.review.text.slice(0,100).concat('...');
        } else {
          this.showMoreLessText = 'Show Less';
          this.text = this.review.text;
        }
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviewEntry.html'
  };
});
