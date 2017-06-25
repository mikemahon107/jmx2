angular.module('main-app')
.service('searchTheMovieDB', function($http) {
  var API_KEYS = '4d3017fc8de9100e02bc619b7791f472'

  this.search = function(query, callback) {
    $http({
    url: 'https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=' + API_KEYS + '&query=' + query.split(' ').join('+'),
    method: 'GET',
    dataType: 'json'
    }).then(function successCallback(response) {
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  }

  this.searchById = function(id, callback) {
    $http({
    url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_KEYS,
    method: 'GET',
    dataType: 'json'
    }).then(function successCallback(response) {
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  }

  this.getRecommendations = function(id, callback) {
    $http({
      url: 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + API_KEYS,
      method: 'GET',
      dataType: 'json'
      }).then(function successCallback(response) {
        if (callback) {
          callback(response.data);
        }
      }, function errorCallback(response) {
        console.log('Error')
      });
    }
});
