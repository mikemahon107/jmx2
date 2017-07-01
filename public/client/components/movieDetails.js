angular.module('main-app')

.directive('movieDetails', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      details: '<',
      video: '<'
    },
    controller: function() {
      this.$onInit = function() {
        this.imdb = ''
        if (this.movie.details) {
          this.imdb = this.movie.details.imdb_id
          var title = this.movie.details.Title;
          title = title.toLowerCase().replace(':','').replace(')','').replace('(','').replace('.','').replace("'",'').replace("'",'').split(' ');
          this.movie.rotten_id = title.join('_');
          this.movie.meta_id = title.join('-');
        }
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieDetails.html'
  };
});
