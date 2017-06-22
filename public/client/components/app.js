angular.module('main-app')

.controller('MainCtrl', function(searchOMDB) {
  this.user = window.exampleData;// this is dummy data, change this later
  this.searchService = searchOMDB
  // console.log(this.resultMovies);
  // this.loggedIn = false;
  // this.apiToken = null;
  console.log('current user', this.user);
  console.log('current users watched movies', this.user.watched)
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
