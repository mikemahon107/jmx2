angular.module('main-app') // copied mostly from ng-cast

.directive('recEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB) {
      // console.log(this.movie)
      // this.movie;
      this.OMDBService = searchOMDB
      this.$onInit = function() {
        // console.log('entry here',this.movie)
        this.OMDBService.search({i: this.movie}, data => {
          console.log(data)
          this.movie = data
        })
      }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recEntry.html'
  };
});
