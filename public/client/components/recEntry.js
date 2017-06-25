angular.module('main-app') // copied mostly from ng-cast

.directive('recEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: function(searchOMDB, $http) {
      this.$onInit = function() {
        console.log(this.movie)
      }
      // this.$onInit = function() {
      //   this.recommendations = []
      //   this.TMDBservice = searchTheMovieDB
      //   this.OMDBService = searchOMDB
      //   console.log(this.movies)
      //   this.movies.forEach(item => {
      //     if (item.isFavorite === true) {
      //       this.TMDBservice.searchById(item.imdb_id, (data) => {
      //         this.TMDBservice.getRecommendations(data.id, (data) => {
                // var results = data.results
                // results.slice(0, 5).sort((a, b) => b.popularity - a.popularity).forEach(item => {
                //   this.TMDBService.search(item.id, (data) => {
                //     this.OMDBService.search({i: data.imdb_id}, (data) => {
                //       console.log(data)
                //       this.recommendations.push(data)
                //     })
                //   })
                // })
      //         })
      //       })
      //     }
      //   })
      // }
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/recEntry.html'
  };
});
