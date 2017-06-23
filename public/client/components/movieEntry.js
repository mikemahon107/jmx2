angular.module('main-app') // copied mostly from ng-cast

.directive('movieEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB) {
      this.$onInit = function() {
        this.OMDBService = searchOMDB
        this.OMDBService.search({t: this.movie.details.title, y: this.movie.details.year}, (data) => {
          this.movie.details = data
        })
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieEntry.html'
  };
});
