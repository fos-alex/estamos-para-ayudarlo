// Ionic Starter App

angular.module('EPA', ['ionic', 'EPA.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.menu', {
      url: "/menu",
      views: {
        'menuContent' :{
          templateUrl: "templates/mainMenu.html",
          controller: 'MainMenuCtrl'
        }
      }
    })
    .state('app.barcodeScanner', {
      url: "/barcodescanner",
      views: {
          'menuContent' :{
              templateUrl: "templates/barcodeScanner.html",
              controller: 'BarcodeScannerCtrl'
          }
      }
    })
    .state('app.nfcReader', {
      url: "/nfcreader",
      views: {
          'menuContent' :{
              templateUrl: "templates/nfcReader.html",
              controller: 'NFCReaderCtrl'
          }
      }
    })
    .state('app.map', {
      url: "/map",
      views: {
        'menuContent' :{
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menu');
});

