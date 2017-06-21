angular.module('main-app')

.controller('SearchController', function(searchTheMovieDB, searchOMDB) {
  this.results;
  this.TMDBservice = searchTheMovieDB
  this.OMDBService = searchOMDB
  this.handleClick = () => {
    this.TMDBservice.search(this.input, (data) => {
      this.results = data.results
    })
  console.log(this.results)
  }
})

.directive('search', function() {
  return {
    scope: {
    },
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/search.html'
  };
});

// .directive('search', function() {
//   return {
//     scope: {},
//     restrict: 'E',
//     // controller: 'SearchCtrl',
//     // controllerAs: 'ctrl',
//     // bindToController: true,
//     templateUrl: 'public/client/templates/search.html'
//   };
// });
