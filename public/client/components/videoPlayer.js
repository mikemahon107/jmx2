angular.module('main-app')

.controller('VideoPlayerController', function() {

  //ASYNC PROBLEM HERE!! Fix it!!

  this.videoUrl = () => {
    return this.video ? `https://www.youtube.com/embed/${this.video.id.videoId}` : '';
  };


})
.directive('videoPlayer', function() {
  return {

    scope: {
      video: '<'
    },
    restrict: 'E',
    controller: 'VideoPlayerController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/videoPlayer.html'
      };
});
