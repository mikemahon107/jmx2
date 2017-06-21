angular.module('main-app') // copied mostly from ng-cast

// .controller('SearchCtrl', function() {
// })
.directive('searchResultList', function() {
  return {
    scope: {
      movies: '<'
    },
    restrict: 'E',
    controller: function() {
       console.log('hello', this.movies);
       // console.log(this.movies);
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/searchResultList.html'
  };
});
