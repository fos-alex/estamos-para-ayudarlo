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

        $scope.map = {
            config: {
                categories:     Map.getCategorias(),
                idSucursal:     4,
                position:       "entrance"
            },
            refresh:        true
        };

        $scope.cambiarCat = function () {
            $scope.map.config.categories = ['Panificados', 'Lacteos'];
            $scope.map.refresh = true;
        };

}]);