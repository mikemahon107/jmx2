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
        });
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recEntry.html'
  };
});
