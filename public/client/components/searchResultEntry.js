angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http) {

  this.handleMovieClick = function() {
    console.log(this.movie.title);
    console.log(this.user);
    $http.post('/addMovie', {user: this.user, movieTitle: this.movie.title});
  }
  // console.log('search entry this', this);
  
})
.directive('searchResultEntry', function() {
  return {
    scope: {
      movie: '<',
      user: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl2',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});
