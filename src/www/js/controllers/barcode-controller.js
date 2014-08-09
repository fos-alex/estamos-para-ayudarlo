angular.module('EPA.controllers')

.controller('BarcodeScannerCtrl', ['$scope', function($scope) {
    alert('pido scanner');

    var scanner = cordova.plugins.barcodeScanner;
    scanner.scan(
        function (result) {
            alert("Barcode dice:\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        }, function (error) {
            alert("Fallo el scanner: " + error);
        });
}]);