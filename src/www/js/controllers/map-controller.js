angular.module('EPA.controllers')

.controller('MapCtrl', [
            '$scope', '$state', '$ionicPopup', 'QRReader', 'Map', 'Sucursal', 'Notificaciones', 'Promociones',
    function($scope, $state, $ionicPopup, QRReader, Map, Sucursal, Notificaciones, Promociones) {
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
                        return true;
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