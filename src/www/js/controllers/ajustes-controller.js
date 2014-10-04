angular.module('EPA.controllers')

.controller('AjustesCtrl', ['$scope', function($scope) {
}])

.controller('GestorDeMapasCtrl', ['$scope', function($scope) {
    $scope.barrios = [
        "Villa Crespo",
        "Palermo",
        "New York"
    ]
}])

.controller('GestorDeNotificacionesCtrl', ['$scope','$ionicPopup','$state', 'Promociones',function($scope,$ionicPopup,$state, Promociones) {
    $scope.showAlert = function() {
        $scope.promociones=null;
        Promociones.get().then(

            function(response) {
                $scope.promociones = response;
                $ionicPopup.show({
                    templateUrl: 'templates/promociones.html',
                    scope: $scope,
                    title: 'Promociones',
                    buttons:[{
                        text: 'OK',
                        type: 'button-primary'
                    }]});
            });
    };
}]);
