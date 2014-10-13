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

        .state('app.registrar', {
            url: "/registrar",
            views: {
                'menuContent' :{
                    templateUrl: "templates/registrar.html",
                    controller: 'RegistrarCtrl'
                }
            }
        })

        .state('app.recupero-clave', {
            url: "/recuperopassword",
            views: {
                'menuContent' :{
                    templateUrl: "templates/recupero-clave.html",
                    controller: 'recupero-claveCtrl'
                }
            }
        })

        .state('app.estadisticas', {
            url: "/estadisticas",
            views: {
                'menuContent' :{
                    templateUrl: "templates/estadisticas.html",
                    controller: 'estadisticaCtrl'
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

            .state('app.comprar', {
            url: "/comprar",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Comprar/index.html",
                    controller: 'ListasCtrl'
                }
            }
        })
        
            .state('app.nuevaCompra', {
            url: "/nuevaCompra",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Comprar/nuevaCompra.html",
                    controller: 'NuevaListaCtrl'
                }
            }
        })
            .state('app.nuevoItemCompra', {
            url: "/nuevaItemCompra",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Comprar/nuevoItemCompra.html",
                    controller: 'NuevoItemListaCtrl'
                }
            }
        })

            .state('app.comprarVisualizar', {
            url: "/comprar/visualizarLista/{idLista:[0-9]{1,20}}",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Comprar/visualizarLista.html",
                    controller: 'ListaDetalleCtrl'
                }
            }
        })
        
        .state('app.compartir', {
            url: "/listas/{idLista:[0-9]{1,20}}/compartir",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Listas/compartirLista.html",
                    controller: 'CompartirCtrl'
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

        .state('app.consultar', {
            url: "/consultar",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Consultar/index.html",
                    controller: 'ConsultarCtrl'
                }
            }
        })
        
        .state('app.consultarProducto', {
            url: "/consultar/{idProducto:[0-9]{1,20}}",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Consultar/detalleProducto.html",
                    controller: 'ConsultarCtrl'
                }
            }
        })
        
        .state('app.ajustes', {
            url: "/ajustes",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Ajustes/index.html",
                    controller: 'AjustesCtrl'
                }
            }
        })
        
        .state('app.gestorMapas', {
            url: "/ajustes/gestorMapas",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Ajustes/gestorMapas.html",
                    controller: 'GestorDeMapasCtrl'
                }
            }
        })
        
        .state('app.gestorNotificaciones', {
            url: "/ajustes/gestorNotificaciones",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Ajustes/gestorNotificaciones.html",
                    controller: 'GestorDeNotificacionesCtrl'
                }
            }
        })
        
        .state('app.modoDeUso', {
            url: "/ajustes/modoDeUso",
            views: {
                'menuContent' :{
                    templateUrl: "templates/Ajustes/modoDeUso.html",
                    controller: 'AjustesCtrl'
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

