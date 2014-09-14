angular.module('EPA.controllers')

.controller('ConsultarCtrl', ['$scope', '$stateParams', 'Producto', 'QRReader',
    function($scope, $stateParams, $location, QRReader) {

    //RESPONSE HARDCODEADO PARA PROBAR, TO-DO: TEMA QR
    var response = {"codigo":0,"mensaje":"Operacion Satisfactoria","data":[{"id":"1","nombre":"Coca","descripcion":"Gaseosa de primera linea","precio":"20","imagen":"./img/coke.jpg","info":"http://www.coca-cola.com.ar/"}]};
    $scope.producto = response.data[0];

//        $scope.producto = QRReader.read();
//        var path = '/app/consultar/';
//        return $location.path(path+ $scope.producto.id);   
        
//        Producto.get($stateParams.idProducto, {}).then(function(response) {
//            $scope.producto = response;
//        });
}])