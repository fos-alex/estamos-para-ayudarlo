angular.module('EPA.controllers')

.controller('MapCtrl', ['$scope', 'QRReader',
    function($scope, QRReader) {
        $scope.squares = [];

        $scope.activateCamera = function () {
            var read = QRReader.read();
            alert(read.text);
        };

        $scope.categories = ['Panificados'];

}])