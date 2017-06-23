angular.module('main-app') // copied mostly from ng-cast

.controller('SearchCtrl', function() {
  // console.log('hello', this.movies);
  // console.log('this', this);
 })
.directive('searchResultList', function() {
  return {
    scope: {
      movies: '<',
      user: '<'
    },
    restrict: 'E',
    // controller: function() {
    //    console.log('hello', this.movies);
    //    // console.log(this.movies);
    // },
    controller: 'SearchCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultList.html'
  };
});
