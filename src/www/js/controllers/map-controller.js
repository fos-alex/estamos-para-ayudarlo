angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', '$state', '$ionicPopup', 'QRReader', 'Map', 'Sucursal', 'Notificaciones', 'Promociones', 'Lista', 'Producto', 'ProductoDetalle', 
    function($scope, $state, $ionicPopup, QRReader, Map, Sucursal, Notificaciones, Promociones, Lista, Producto, ProductoDetalle) {
        $scope.squares = [];

        $scope.map = Map.getConfig();
        if (Sucursal.idSucursal) {
            $scope.map.config.idSucursal = Sucursal.idSucursal;
        } else {
            $ionicPopup.show({
                templateUrl: 'templates/descargar-mapa.html',
                scope: $scope,
                title: 'Descargar mapa',
                buttons:[{
                    text: 'OK',
                    type: 'button-primary',
                    onTap: function(e) {
                        QRReader.read(function (err, response) {
                            if (!response.id_sucursal) {
                                alert("El QR escaneado no tiene la sucursal. Escanee otro.");
                            }
                            $scope.map.config.idSucursal = response.id_sucursal;
                        });
                    }
                }]
            });
        }

        $scope.scan = function () {
            QRReader.read(function (err, response) {
                $scope.$parent.producto = response;
                return $state.go('app.consultarProducto', {idProducto: $scope.$parent.producto.id});
            });
        };

        $scope.mostrarPromociones = function() {
            if (!Notificaciones.statusPromos()) {
                return false;
            }

            $scope.promociones = null;
            Promociones.get().then(
                function(response) {
                    $scope.promociones = response;
                    $ionicPopup.show({
                        templateUrl: 'templates/promociones.html',
                        scope: $scope,
                        title: 'Promociones',
                        buttons:[{
                            text: 'OK',
                            type: 'button-primary'
                        }]
                    });
                }
            );
        };
        $scope.mostrarPromociones();

        $scope.$watch(function() {return Map.getRefresh();}, function (newVal) {
            if (newVal) {
                $scope.map.config.categories = Map.getCategorias();
                $scope.map.config.position = Map.getPosicion();
                $scope.map.refresh = true;
            }
        });

        $scope.cambiarCat = function () {
            Map.setCategorias(['Panificados', 'Lacteos']);
            Map.refresh();
        };

        $scope.leerQr = function(callback) {
            QRReader.read(function (err, response) {
                callback(response);
            });
        };
        
        $scope.estaEnLista = function (id){
            var found = false;
            angular.forEach($scope.listaVigente.productos, function (producto) {
                if (found) return;     
                if (producto.id === id) {
                    found = true;
                }
            });
            return found;
        };
        
        $scope.traerDeLista = function (id){
            var productoEncontrado = null;
            angular.forEach($scope.listaVigente.productos, function (producto) {
                if (producto.id === id) {
                    productoEncontrado = producto;
                }
            });
           return productoEncontrado;
        };
        
        $scope.agregarALista = function (producto) {
            debugger;
            if ($scope.estaEnLista(producto.id_generico)) {
                producto = $scope.traerDeLista(producto.id);
                producto.comprado = true;
            } else {
                $scope.buscarProducto(producto.id, function (producto) {
                    producto.comprado = true;
                    $scope.listaVigente.productos.push(producto);
                    Map.addCategoria(producto.categoria);
                    Map.setPosicion(producto.categoria);
                    Map.refresh();
                });
            }
        };
        
        $scope.buscarProducto = function(id, callback) {
            ProductoDetalle.get(id).then(
                function(response){
                    callback(response.data.data);
                }
            );
        };
        
        $scope.agregarProducto = function () {
            $scope.listaVigente = $scope.obtenerLista();
            $scope.leerQr($scope.agregarALista);
        };

        $scope.obtenerLista = function(){
            if (!Lista.listaVigente){
                Lista.listaVigente = {
                    productos: []
                };
            }
            return Lista.listaVigente;
        };
//        $scope.buscarProducto = function () {
//
//        };

    /*Sucursal Actual*/
//    LO DEJO COMENTADO PARA NO ROMPER NADA
//    PERO LA IDEA ES QUE SE LEVANTE LA SUCURSAL ACTUAL Y SE CARGUE EL MAPA CORRESPONDIENTE
//    Y SI NO ESTÁ EN NINGUNA SUCURSAL, QUE CARGUE ALGÚN MAPA POR DEFECTO... O EL LISTADO DE MAPAS
//
//        navigator.geolocation.getCurrentPosition(function(success) {
//                var position = success.coords;
//                $scope.latitud = position.latitude;
//                $scope.longitud = position.longitude;
//                $scope.sucursalActual = Sucursal.sucursalActual(this.latitud, this.longitud);
//        }, function(error) {
//                alert('error ' + error);
//
//        });
}]);