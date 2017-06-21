angular.module('main-app')
.service('searchOMDB', function($http){
  var API_KEYS = 'e30180a3';
  //this function make the url for the request
  var makeQueryString = function(url, params) {
    var paramsArray = []
    for (p in params) {
      paramsArray.push(p + '=' + params[p]);
    }
    return url + paramsArray.join('&');
  }

  var queryString = function(url, param) {
    return url + `s=${param}`
  };

  this.search = function(query, callback) {
    $http({
    url: queryString('http://omdbapi.com/?', query) + '&apikey=' + API_KEYS + '&page=1',
    method: 'GET',
    dataType: 'json',
    }).then(function successCallback(response) {
      console.log(response.data.Search);
      if (callback) {
        callback(response.data);
      }
    }, function errorCallback(response) {
      console.log('Error')
    });
  };
});
