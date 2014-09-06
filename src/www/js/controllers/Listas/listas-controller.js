angular.module('EPA.controllers')

.controller('ListasCtrl', ['$scope', '$stateParams', 'Lista', 'Session',
    function($scope, $stateParams, Lista, Session) {
        $scope.shouldShowDelete = false;

        Session.set('createdList', {});
        Lista.get("", {refreshCache: true}).then(function(response) {
            $scope.listas = response.sort(function(a,b){
                return (b.id - a.id)
            });
        });

        $scope.delete = function (lista) {
            Lista.delete(lista).then(function (response) {
                angular.forEach($scope.listas, function(value, key) {
                    if (value.id == response.id) {
                        $scope.listas.splice(key, 1);
                    }
                });
            });
        };
}])