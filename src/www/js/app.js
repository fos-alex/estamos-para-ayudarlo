// Ionic Starter App

angular.module('EPA', [
        'ionic',
        'EPA.config',
        'EPA.controllers',
        'EPA.directives',
        'EPA.services',
        'ngCookies'
    ])
.config(function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
})
.run(function($ionicPlatform,$rootScope,$cookies) {
  $rootScope.modoaudio = eval($cookies.modoaudio);
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
