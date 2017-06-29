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
        this.getTimeDiff()
      }
      this.timeStatement = ''
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

      this.getTimeDiff = () => {
        var now = new Date()
        var reviewTime = new Date(this.review.date)
        var diff = now - reviewTime
        var mss_in_year = 1000*60*60*24*365
        var units = ['year', 'month', 'day', 'hour', 'minute', 'second']
        var units_mss = [1, 12, 365, 365*24, 365*24*60, 365*24*60*60]
        var idx = 0;
        var mss = mss_in_year/units_mss[idx];
        while (idx < 6 && (diff < mss)) {
          idx += 1
          mss = mss_in_year/units_mss[idx]
        }
        var factor = Math.floor(diff/mss);
        var unit_time = units[idx]
        if (factor > 1) {
          unit_time = unit_time.concat('s')
        }
        this.timeStatement = factor.toString() + ' ' + unit_time + ' ago'
      }

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviewEntry.html'
  };
});
