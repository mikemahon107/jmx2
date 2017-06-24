angular.module('main-app')

.controller('MainCtrl', function(searchOMDB, $http) {
  this.user = {};// this is dummy data, change this later
  // this.user;
  this.searchService = searchOMDB

  this.intendedUser;

  $http.get('/sess').then((session) => {
    // console.log('This is triggered', session);
    // console.log('hello', session);
    this.intendedUser = session;
    // console.log('intendedUser is now: ', this.intendedUser, 'this.user is ', this.user);
    // console.log('intendedUser name', this.intendedUser.data.username);
    this.user.username = this.intendedUser.data.username;
    this.user.watched = this.intendedUser.data.watched;
    this.user.favorites = this.intendedUser.data.favorites;
  });


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
