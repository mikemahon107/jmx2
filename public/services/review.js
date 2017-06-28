angular.module('main-app')

.service('review', function($http) {
  // query should be `${movie title} trailer -- passed in via handleTitleClick function`
  this.postReview = function(imdb_id, review, callback) {
    $http({
      url: 'http://localhost:3000/addReview',
      method: 'POST',
      dataType: 'json',
      data: {
        imdb_id: imdb_id,
        review: review // should be an object strucutred like this: {user: 'INSERT USERNAME HERE', text: 'INSERT TEXT HERE', score: 'SCORE', date: 'POSTED'}
      }
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
});
