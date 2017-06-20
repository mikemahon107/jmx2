angular.module('main-app')

.controller('MainCtrl', function(searchOMDB) {
  this.users = window.exampleData;
  this.searchService = searchOMDB
  // console.log(this.resultMovies);
  // console.log('search service', this.searchService);
  // console.log('users', this.users);
  // this.searchResults = (data) => {
  //   this.movies = data;
  //   this.currentVideo = this.videos[0];
  // }

})
.directive('app', function() { // directive name is the HTML tag name REMEMBER THIS
  return {
    scope: {},
    restrict: 'E',
    controller: 'MainCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/app.html'
  };
});
