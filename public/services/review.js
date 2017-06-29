angular.module('main-app')

.service('review', function($http) {
  // query should be `${movie title} trailer -- passed in via handleTitleClick function`
  this.postReview = function(body, callback) {
    $http({
      url: 'http://localhost:3000/addReview',
      method: 'POST',
      dataType: 'json',
      data: body, // should be an object structured like this: {id: 'UNIQUE ID', user: 'INSERT USERNAME HERE', text: 'INSERT TEXT HERE', score: 'SCORE', date: 'POSTED', rating: 'RATING'}
    }).then(function successCallback(response) {
      if (callback) {
        console.log('success', response);
        callback(response);
      }
    }, function errorCallback(response) {
      console.log('error', response);
      callback(response);
    });
  };

  this.getReviews = function(imdb_id, callback){
    $http({
      url: 'http://localhost:3000/reviews',
      method: 'GET',
      dataType: 'json',
      params: {imdb_id: imdb_id}
    }).then(function successCallback(response) {
      if (callback) {
        callback('success', response);
        callback(response);
      }
    }, function errorCallback(response) {
      console.log('error', response);
    });
  };
});
