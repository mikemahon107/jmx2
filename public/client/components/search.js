angular.module('main-app')

.controller('SearchController', function(searchTheMovieDB, searchOMDB) {
  this.results;
  this.TMDBservice = searchTheMovieDB;
  this.OMDBService = searchOMDB;
  this.handleClick = () => {
    this.TMDBservice.search(this.input, (data) => {
      this.results = data.results.slice(0,5)
      this.results.map(item => {
        item.poster_path = 'http://image.tmdb.org/t/p/w45/' + item.poster_path
      })
    });
    // console.log('search this', this);
  }
})

.directive('search', function($document) {
  return {
    scope: {
      user: '<'
    },
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/search.html',
    link: function(scope, element, attr){
      
      scope.isPopupVisible = false;

      scope.toggleSelect = function(){
        // console.log('in toggleSelect');
        scope.isPopupVisible = !scope.isPopupVisible;
      }

      $document.bind('click', function(event){
        // console.log('in link!', 'clicked');
        // console.log('event target', event.target.id);
        // console.log('element', element);
        // console.log('attributes', attr);
        // var isClickedElementChildOfPopup = element
        //   .find(event.target)
        //   .length > 0;

        // console.log('isChild', isClickedElementChildOfPopup);
          
        if (event.target.id === 'searchButton') {
          console.log('true');
          return;
        }
          
        scope.isPopupVisible = false;
        scope.$apply();
      });
    }
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
