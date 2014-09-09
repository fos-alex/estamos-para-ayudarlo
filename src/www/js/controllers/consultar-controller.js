angular.module('EPA.controllers')

.controller('ConsultarCtrl', ['$scope', '$stateParams', 'Producto', 'Session',
    function($scope, $stateParams, Producto, Session) {

        Producto.get($stateParams.idProducto, {}).then(function(response) {
            $scope.producto = response;
        });
}])