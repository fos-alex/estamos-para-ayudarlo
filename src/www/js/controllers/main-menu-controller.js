angular.module('EPA.controllers')

    .controller('MainMenuCtrl', ['$scope','$ionicPopup','$state','User', 'Promociones','Notificaciones',
        function($scope, $ionicPopup, $state, User, Promociones, Notificaciones) {
            $scope.menuItems = [
                {title: 'Scanner',         id: 1, href: "barcodescanner"  },
                {title: 'Map',             id: 2, href: "map" },
                {title: 'NFC Reader',      id: 3, href: "nfcreader" },
                {title: 'Geolocalization', id: 4, href: "geo" },
                {title: 'ABM Listas',      id: 5, href: "listas" }
            ];

            $scope.mostrarPromociones = function(){
                if(!Notificaciones.status_promos() ){
                    $state.go('app.map');
                }else{
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
                                    type: 'button-primary',
                                    onTap: function(e) {
                                        $state.go('app.map');
                                    }
                                }]});
                        });
                }
            };

            $scope.logout= function(){
                User.logout()
                };

        }])
