angular.module('main-app')

.service('review', function($http) {
  // query should be `${movie title} trailer -- passed in via handleTitleClick function`
  var makeQueryString = function(url, params) {
    var paramsArray = []
    for (p in params) {
      paramsArray.push(p + '=' + params[p]);
    }
    return url + paramsArray.join('&');
  }

  this.postReview = function(body, callback) {
    $http({
      url: 'http://localhost:3000/addReview',
      method: 'POST',
      dataType: 'json',
      data: body, // should be an object structured like this: {user: 'INSERT USERNAME HERE', text: 'INSERT TEXT HERE', score: SCORE, votes: {username: +1 or -1}, date: 'POSTED', rating: 'RATING'}
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
      url: makeQueryString('http://localhost:3000/reviews?', {imdb_id: imdb_id}),
      method: 'GET',
      dataType: 'json'
    }).then(function successCallback(response) {
      if (callback) {
        callback(response);
      }
    }, function errorCallback(response) {
      console.log('error', response);
    });
  };

// this needs to be changed
  this.upVote = function(body, callback) {
    $http({
      url: 'http://localhost:3000/upvote',
      method: 'POST',
      dataType: 'json',
      data: body,
    }).then(function successCallback(response) {
      if (callback) {
        console.log('success', response);
        callback(response);
      }
    }, function errorCallback(response) {
      console.log('error', response);
      callback(response);
    });
  }

  this.downVote = function(body, callback) {
    $http({
      url: 'http://localhost:3000/downvote',
      method: 'POST',
      dataType: 'json',
      data: body,
    }).then(function successCallback(response) {
      if (callback) {
        console.log('success', response);
        callback(response);
      }
    }, function errorCallback(response) {
      console.log('error', response);
    });
  }
});
