angular.module('main-app')

.factory('AuthModel', function($http, $location) {
  var storeURL = 'http://localhost:3000'; //<-- fix this *should be fixed* -JO
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
      // console.log('signed in');
      callback(null, res.data.apiToken);
      $location.path('/user');
    })
    .catch(function(err) {
      alert('Incorrect username or password')
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
      console.log('signed up');
      signin(username, password, callback);
      $location.path('/user');
    })
    .catch(function(err) {
      alert('Username taken')
      callback(err);
    });
  };

  return {
    signin: signin,
    signup: signup
  };
});
