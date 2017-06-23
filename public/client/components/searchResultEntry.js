angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl2', function($http) {

  this.$onInit = function() {
    this.handleMovieClick = function() {
      // console.log(this.movie.title);
      // console.log(this.user);
      $http.post('/addMovie', {user: this.user.username, movieTitle: this.movie.title}).then(() => {
        $http.get('/sess').then((session) => {
          console.log('This is triggered', session, 'this is username: ', this.user.username);

          // this.intendedUser = session;
          // this.user.username = session.data.username;
          this.user.watched = session.data.watched;

          // $route.reload();
        });
      });

    }
  // console.log('search entry this', this);
   console.log('this.user', this.user)
    // body...
  }
  
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
