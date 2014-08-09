angular.module('EPA')
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })

        .state('app.login', {
            url: "/login",
            views: {
                'menuContent' :{
                    controller: 'LoginCtrl',
                    templateUrl: "templates/Login/index.html"
                }
            }
        })

        .state('app.listas', {
            url: "/listas",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Listas/index.html",
                    controller: 'ListasCtrl'
                }
            }
        })

        .state('app.lista', {
            url: "/listas/{idLista:[0-9]{1,20}}",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Listas/listaDetalle.html",
                    controller: 'ListaDetalleCtrl'
                }
            }
        })

        .state('app.nuevaLista', {
            url: "/listas/nuevalista",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Listas/nuevaLista.html",
                    controller: 'NuevaListaCtrl'
                }
            }
        })

        .state('app.nuevoItemLista', {
            url: "/listas/nuevalista/nuevoitem",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Listas/nuevoItemLista.html",
                    controller: 'NuevoItemListaCtrl'
                }
            }
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
                    templateUrl: "templates/nfc.html",
                    controller: 'NFCReaderCtrl'
                }
            }
        })
        .state('app.geo', {
            url: "/geo",
            views: {
                'menuContent' :{
                    templateUrl: "templates/geolocalization.html",
                    controller: 'GeolocalizationCtrl'
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
    $urlRouterProvider.otherwise('/app/login');
});

