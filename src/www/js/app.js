// Ionic Starter App

angular.module('EPA', [
        'ionic',
        'EPA.controllers',
        'EPA.directives',
        'EPA.services'
    ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
