angular.module('EPA.controllers')

.controller('MainMenuCtrl', ['$scope','$ionicPopup','$state', function($scope, $ionicPopup, $state) {
  $scope.menuItems = [
      {title: 'Scanner',         id: 1, href: "barcodescanner"  },
      {title: 'Map',             id: 2, href: "map" },
      {title: 'NFC Reader',      id: 3, href: "nfcreader" },
      {title: 'Geolocalization', id: 4, href: "geo" },
      {title: 'ABM Listas',      id: 5, href: "listas" }
  ];
        /*Promociones.get($stateParams.idPromociones, {}).then(function(response){
                $scope.promociones = response;
            }
        );*/

        $scope.showAlert = function() {
            $ionicPopup.alert({
                title: 'Promociones Vigentes',
                template: 'Las promociones vigentes son:'
            }).then(function(res) {
                $state.go('app.map');
            });

        };

}])