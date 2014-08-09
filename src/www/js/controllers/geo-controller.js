angular.module('EPA.controllers')

.controller('GeolocalizationCtrl', ['$scope', function($scope) {
    alert('pido geo');
    navigator.geolocation.getCurrentPosition(function (success) {
        var position = success.coords;
        $scope.localization = 'Latitud: '+position.latitude+'. Longitud: '+position.longitude;
        $scope.$apply();
        alert('success '+success);

    }, function (error) {
        alert('error '+error);

    });
}]);