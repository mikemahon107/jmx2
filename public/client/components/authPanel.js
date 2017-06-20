angular.module('main-app') //copied mostly from pet-shop

.controller('AuthPanelCtrl', function() {
  this.username = '',
  this.password = '',
  this.mode = true,

  this.toggleMode = () => {
    var action = this.mode ? 'signin' : 'signup';

    AuthModel[action](this.username, this.password, (err, apiToken) => {
      if (err) {
        return console.log(err);
      }
      this.loggedIn = true;
      this.apiToken = apiToken;
    });
  };
})

.directive('authPanel', function() {
  return {
    restrict: 'E',
    scope: {
      loggedIn: '=',
      apiToken: '='
    },
    controller: 'AuthPanelCtrl',
    bindToController: true,
    templateUrl: 'public/client/templates/authPanel.html'
  };
});
