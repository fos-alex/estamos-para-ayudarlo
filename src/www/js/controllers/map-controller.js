angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', 'QRReader',
    function($scope, QRReader) {
        $scope.squares = [];

        $scope.activateCamera = function () {
            var read = QRReader.read();
            alert(read.text);
        };
        $('#map-container').canvasMap({
            url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
            //url: "http://local.epa-web.com/app",
            url_mapa: '/mapas/' + $('#id_sucursal').val()
        });

}])