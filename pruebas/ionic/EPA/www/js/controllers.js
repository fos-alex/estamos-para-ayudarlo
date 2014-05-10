angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
      {title: 'Products', id: 1 },
      {title: 'Map', id: 2 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope.squares = [
        {x : 0, y: 0, height: 20, length: 50},
        {x : 0, y: 0, height: 20, length: 50},
        {x : 0, y: 0, height: 50, length: 50}
    ];
})


.directive('ngRaphaelSquare', function(){
        return {
            link: function(scope, element, attrs) {
                debugger;
                var r = Raphael(element[0]);

                r.add([
                    {type:"rect", x:0, y:0,   width:100, height:60},
                    {type:"rect", x:100, y:0, width:100, height:60},
                    {type:"rect", x:200, y:0, width:100, height:60},
                    {type:"rect", x:400, y:0, width:100, height:60},
                    {type:"rect", x:500, y:130, width:100, height:60}

                ]);
            }
        };
})
