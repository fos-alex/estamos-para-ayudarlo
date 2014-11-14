angular.module('EPA.controllers')

    .controller('MainMenuCtrl', ['$scope' ,'$state', 'User',
        function($scope, $state, User) {
            $scope.menuItems = [
                {title: 'Scanner',         id: 1, href: "barcodescanner"  },
                {title: 'Map',             id: 2, href: "map" },
                {title: 'NFC Reader',      id: 3, href: "nfcreader" },
                {title: 'Geolocalization', id: 4, href: "geo" },
                {title: 'ABM Listas',      id: 5, href: "listas" }
            ];

            $scope.logout= function(){
                User.logout()
            };

        }])
