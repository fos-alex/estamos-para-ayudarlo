angular.module('EPA.controllers')

.controller('MainMenuCtrl', ['$scope', function($scope) {
  $scope.menuItems = [
      {title: 'Scanner',         id: 1, href: "barcodescanner"  },
      {title: 'Map',             id: 2, href: "map" },
      {title: 'NFC Reader',      id: 3, href: "nfcreader" },
      {title: 'Geolocalization', id: 4, href: "geo" },
      {title: 'ABM Listas',      id: 5, href: "listas" }
  ];
}])