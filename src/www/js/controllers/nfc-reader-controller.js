angular.module('EPA.controllers')

.controller('NFCReaderCtrl', ['$scope', function($scope) {
    alert('pido reader');

    nfc.addTagDiscoveredListener(function (result) {
        alert('resultado '+result);

    }, function (success) {
        alert('success '+success);


    }, function (error) {
        alert('error '+error);


    });
}])
