angular.module('main-app')

.factory('AuthModel', function($http) {
  var storeURL = 'wait what?'; //<-- fix this
  var signin = function(username, password, callback) {
    $http({
      url: `${storeURL}/signin`,
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(res) {
      callback(null, res.data.apiToken);
    })
    .catch(function(err) {
      callback(err);
    });
  };

  var signup = function(username, password, callback) {
    $http({
      url: `${storeURL}/signup`,
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
    .then(function() {
      signin(username, password, callback);
    })
    .catch(function(err) {
      callback(err);
    });
  };

  return {
    signin: signin,
    signup: signup
  };
});
