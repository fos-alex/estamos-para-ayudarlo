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
                alert(JSON.stringify(response));
                alert(response.id);
                $scope.$parent.producto = response;
                return $location.path('/app/consultar/' + $scope.$parent.producto.id);
            });
        };

        $('#map-container').canvasMap({
            url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
            //url: "http://local.epa-web.com/app",
            url_mapa: '/mapas/' + $('#id_sucursal').val()
        });

}]);