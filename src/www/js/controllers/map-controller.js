angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope','$location', 'QRReader',
    function($scope,$location,QRReader) {
        $scope.squares = [];

//        $scope.activateCamera = function () {
//            var read = QRReader.read();
//            alert(read.text);
//        };
        
        $scope.scan = function () {
            QRReader.read(function (err, response) {
                $scope.$parent.producto = response[0];
                return $location.path('/app/consultar/' + $scope.$parent.producto.id);
            });
        };        
        
        $('#map-container').canvasMap({
            url: "http://local.epa-web.com/app",
            url_mapa: '/mapas/' + $('#id_sucursal').val()
        });

}])