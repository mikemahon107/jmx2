angular.module('main-app')

.directive('reviewEntry', function() {
  return {
    scope: {
      review: '=',
      user: '<',
      imdb: '<'
    },
    restrict: 'E',
    controller: function(review) {
      this.$onInit = () => {
        if (this.review.text.length > 170) {
          this.text = '"'+this.review.text.slice(0,165).concat('...') + '"';
          this.showMoreLessText = 'Show More';
        } else {
          this.text = '"' + this.review.text + '"'
        }
        this.getTimeDiff()
        if (this.review.upvotes.includes(this.user.username)) {
          this.toggleUpVote = true;
        } else if (this.review.downvotes.includes(this.user.username)) {
          this.toggleDownVote = true;
        }
      }
      this.timeStatement = ''
      this.showMoreLessText = '';
      this.showMore = true
      this.toggleUpVote = false;
      this.toggleDownVote = false;
      this.toggleTextLength = () => {
        if (this.review.text.length > 170) {
          this.showMore = !this.showMore;
          if (this.showMore) {
            this.showMoreLessText = 'Show More';
            this.text = '"' + this.review.text.slice(0,165).concat('...') + '"';
          } else {
            this.showMoreLessText = 'Show Less';
            this.text = '"' + this.review.text + '"';
          }
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

      this.upVote = () => {
        review.upVote({imdb_id: this.imdb, user: this.review.user, date: this.review.date, clickUser: this.user.username}, function(result) {console.log('result in upvote: ', result)})

        if (!this.toggleDownVote) {
          this.toggleUpVote = !this.toggleUpVote
          if (this.toggleUpVote) {
            this.review.score += 1;
          } else {
            this.review.score -= 1;
          }
        } else {
          this.review.score += 2;
          this.toggleDownVote = false;
          this.toggleUpVote = true;
        }
      }

      this.downVote = () => {
        review.downVote({imdb_id: this.imdb, user: this.review.user, date: this.review.date, clickUser: this.user.username}, function(result) {console.log('result in downvote: ', result)})

        if (!this.toggleUpVote) {
          this.toggleDownVote = !this.toggleDownVote
          if (this.toggleDownVote) {
            this.review.score -= 1
          } else {
            this.review.score += 1
          }
        } else {
          this.review.score -= 2
          this.toggleUpVote = false;
          this.toggleDownVote = true;
        }
      }

    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/reviewEntry.html'
  };
});
