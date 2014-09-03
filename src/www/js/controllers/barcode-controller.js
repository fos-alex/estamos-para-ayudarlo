angular.module('EPA.controllers')

.controller('BarcodeScannerCtrl', ['$scope', 'QRReader',function($scope, QRReader) {
        QRReader.scan(function (err,result) {
            debugger;
        });
}]);