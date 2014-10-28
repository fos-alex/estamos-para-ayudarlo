angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', '$state', 'QRReader', 'Map',
    function($scope, $state, QRReader, Map) {
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
            $scope.map.config.categories = newVal;
            $scope.map.refresh = true;
        });

        $scope.$watch(function() {return Map.getPosicion();}, function (newVal) {
            $scope.map.config.position= newVal;
            $scope.map.refresh = true;
        });

        $scope.map = {
            config: {
                categories:     [],
                idSucursal:     4,
                position:       "entrance"
            },
            refresh:        false
        };

        $scope.cambiarCat = function () {
            $scope.map.config.categories = ['Panificados', 'Lacteos'];
            $scope.map.refresh = true;
        };

}]);