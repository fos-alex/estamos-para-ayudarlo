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

        
        $scope.deleteResponse = {
            message: "",
            notifyShow: false,
            type: "info"
        };

        $scope.delete = function (lista) {
            Lista.delete(lista).then(function (response) {
                debugger;
                angular.forEach($scope.listas, function(value, key) {
                    if (value.id == response.id) {
                        $scope.listas.splice(key, 1);
                    }
                });
            }, function (response) {
                debugger;
                $scope.deleteResponse.notifyShow = true;
                $scope.deleteResponse.type = 'error';
                $scope.deleteResponse.message = response.mensaje;
            });
        };
}])