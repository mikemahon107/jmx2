angular.module('main-app')

.service('youTube', function($http, $window) {
  // query should be `${movie title} trailer`
  this.search = function(query, callback) {
    $http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        // we only need one video here - the top result from the API
        maxResults: 1,
        key: $window.youTube_key,
        videoEmbeddable: 'true'
      }
    })
    .then(function({data}) {
      if (callback) {
        // should only return the top response from the youtube API
        // this will be rendered in the video player in the movie detail view
        callback(data.items);
      }
    })
    .catch(function({data}) {
      data.error.errors.forEach(function(err) {
        console.error(err.message);
      });
    });
  };
});
