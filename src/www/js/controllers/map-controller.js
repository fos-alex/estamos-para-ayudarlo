angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', '$state', 'QRReader', 'Map', 'Sucursal', 'Lista', 'Producto', 'ProductoDetalle', 
    function($scope, $state, QRReader, Map, Sucursal, Lista, Producto, ProductoDetalle) {
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

        $scope.$watch(function() {return Map.getRefresh();}, function (newVal) {
            if (newVal) {
                $scope.map.config.categories = Map.getCategorias();
                $scope.map.config.position = Map.getPosicion();
                $scope.map.refresh = true;
            }
        });

        $scope.map = Map.getConfig();

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
            if (!$scope.estaEnLista(producto.id_generico)) {
                producto = $scope.buscarProducto(producto.id);
            } else {
                producto = $scope.traerDeLista(producto);
            }
            producto.comprado = true;

            $scope.listaVigente.productos.push(producto);
        };
        
        $scope.buscarProducto = function(id) {
            ProductoDetalle.get(id).then(
                function(response){
                    $scope.productoNuevo = response.data.data;
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