angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function() {

  this.handleMovieClick = function() {
    console.log(this.movie.title);
  }
  //console.log('entry this', this);
  
})
.directive('searchResultEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    restrict: 'E',
    controller: 'SearchCtrl2',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultEntry.html'
  };
});
