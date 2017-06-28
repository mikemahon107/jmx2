angular.module('main-app')

.directive('recEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<',
      handleTitleClick: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB) {
      this.OMDBService = searchOMDB
      this.$onInit = function() {
        this.OMDBService.search({i: this.movie}, data => {
          this.movie = data;
          this.movie.Ratings_Obj = {}
          for (var rating of data.Ratings) {
            this.movie.Ratings_Obj[rating.Source] = rating.Value
          }
          var title = this.movie.Title;
          title = title.toLowerCase().replace(':','').replace(')','').replace('(','').replace('.','').replace("'",'').replace("'",'').split(' ');
          this.movie.rotten_id = title.join('_');
          this.movie.meta_id = title.join('-');
        });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recEntry.html'
  };
});
