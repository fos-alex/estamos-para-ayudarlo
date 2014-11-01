angular.module('EPA.controllers')

.controller('ConsultarCtrl', [
            '$scope', '$stateParams', '$state', 'QRReader', 'Map',
    function($scope, $stateParams, $state, QRReader, Map) {
 //   $scope.scan = function () {
 //       QRReader.read(function (err, response) {
 //           $scope.producto = response[0];
 //           return $location.path('/app/consultar/' + $scope.producto.id);
 //       });
 //   };
        $scope.producto = angular.copy($scope.$parent.producto);

        $scope.recalcularCamino = function (categoria) {
            Map.setPosicion(categoria);
            $state.go('app.map');
        };
//

//        Producto.get($stateParams.idProducto, {}).then(function(response) {
//            $scope.producto = response;
//        });
}]);