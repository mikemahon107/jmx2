angular.module('main-app')

.controller('MainCtrl', function(searchTheMovieDB, searchOMDB, $http) {
  this.user = {};// this is dummy data, change this later
  this.recommendations = []
  this.TMDBservice = searchTheMovieDB
  this.OMDBService = searchOMDB
  this.intendedUser;

  $http.get('/sess').then((session) => {
    // console.log('This is triggered', session);
    // console.log('hello', session);
    this.intendedUser = session;
    // console.log('intendedUser is now: ', this.intendedUser, 'this.user is ', this.user);
    // console.log('intendedUser name', this.intendedUser.data.username);
    this.user.username = this.intendedUser.data.username;
    this.user.watched = this.intendedUser.data.watched;

    this.user.watched.forEach(item => {
      if (item.isFavorite) {
        this.TMDBservice.searchById(item.imdb_id, data => {
          this.TMDBservice.getRecommendations(data.id, data => {
            var temp = data.results.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map(item => item.id)
            temp.forEach(id => {
              this.TMDBservice.searchById(id, data => {
                this.recommendations.push(data.imdb_id)
                this.recommendations.sort()
              })
            })
          })
        })
      }
    })
  });
  this.recommendations = this.recommendations.filter((item, i, arr) => item !== arr[i + 1])
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
