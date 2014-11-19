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
.run(function($ionicPlatform,$rootScope,$cookies,Cercania) {
  $rootScope.configuracion = angular.fromJson($cookies.configuracion) || {};
  $ionicPlatform.ready(function() {
    Cercania.run();
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
