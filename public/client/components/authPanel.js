angular.module('main-app') //copied mostly from pet-shop

.controller('AuthPanelCtrl', function(AuthModel) {
  this.username = '',
  this.password = '',
  this.mode = true,
  this.loggedIn = null, // this is a test, ang doesn't like like 23
  this.apiToken = '',

  this.toggleMode = () => {
    this.mode = !this.mode;
  },

  this.authorize = () => {
    var action = this.mode ? 'signin' : 'signup';

    AuthModel[action](this.username, this.password, (err, apiToken) => {
      if (err) {
        return console.log(err);
      }
      // this.loggedIn = true;
      // this.apiToken = apiToken;
    });
  }
})

.directive('authPanel', function() {
  return {
    restrict: 'E',
    scope: {
      loggedIn: '=',
      apiToken: '='
    },
    controller: 'AuthPanelCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/authPanel.html'
  };
});
