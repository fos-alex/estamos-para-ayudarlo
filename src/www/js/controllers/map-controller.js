angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', '$state', 'QRReader', 'Map', 'Sucursal',
    function($scope, $state, QRReader, Map, Sucursal) {
        $scope.squares = [];

//        $scope.activateCamera = function () {
//            var read = QRReader.read();
//            alert(read.text);
//        };
        
        $scope.scan = function () {
            QRReader.read(function (err, response) {
                //alert(JSON.stringify(response));
                //alert(response.id);
                $scope.$parent.producto = response;
                return $state.go('app.consultarProducto', {idProducto: $scope.$parent.producto.id});
                //return $location.path('/app/consultar/' + $scope.$parent.producto.id);
            });
        };

        $scope.$watch(function() {return Map.getCategorias();}, function (newVal) {
            if (newVal && newVal instanceof Array) {
                $scope.map.config.categories = newVal;
                $scope.map.refresh = true;
            }
        });

        $scope.$watch(function() {return Map.getPosicion();}, function (newVal) {
            if (newVal) {
                $scope.map.config.position= newVal;
                $scope.map.refresh = true;
            }
        });

        $scope.map = {
            config: {
                categories:     ['Almacen', 'Bebidas', 'Panificados'],
                idSucursal:     4,
                position:       "entrance"
            },
            refresh:        true
        };

        $scope.cambiarCat = function () {
            $scope.map.config.categories = ['Panificados', 'Lacteos'];
            $scope.map.refresh = true;
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