angular.module('EPA.controllers')

    .controller('MainMenuCtrl', ['$scope','$ionicPopup','$state','Promociones',
        function($scope, $ionicPopup, $state,Promociones) {
            $scope.menuItems = [
                {title: 'Scanner',         id: 1, href: "barcodescanner"  },
                {title: 'Map',             id: 2, href: "map" },
                {title: 'NFC Reader',      id: 3, href: "nfcreader" },
                {title: 'Geolocalization', id: 4, href: "geo" },
                {title: 'ABM Listas',      id: 5, href: "listas" }
            ];


            $scope.showAlert = function() {
                $scope.promociones=null;
                Promociones.get().then(

                    function(response) {
                        $scope.promociones = response;
                        $ionicPopup.alert({
                            templateUrl: '/#/app/promociones.html',
                            title: 'hola'
                            //template: 'Las promociones vigentes son:' + JSON.stringify(response)

                        }).then(function() {
                            $state.go('app.map');
                        });



                    });


            };

        }])
