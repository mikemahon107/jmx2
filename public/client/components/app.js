angular.module('main-app')

.controller('MainCtrl', function() {

})
.directive('main', function() {
  return {
    scope: {},
    // restrict?
    controller: 'MainCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'client/templates/main.html'
  };

});