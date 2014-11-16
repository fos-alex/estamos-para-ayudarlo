angular.module('EPA.controllers')

.controller('ListasCtrl', ['$scope', '$stateParams', 'Lista',
    function($scope, $stateParams, Lista) {
        $scope.shouldShowDelete = false;

        $scope.listaVigente = Lista.listaVigente;
        Lista.get("", {refreshCache: true}).then(function(response) {
            if (response) {
                $scope.listas = response.sort(function(a,b){
                    return (b.id - a.id)
                });
            };
        });

        $scope.deleteResponse = {
            message: "",
            notifyShow: false,
            type: "info"
        };

        $scope.delete = function (lista) {
            Lista.delete(lista).then(function (response) {
                angular.forEach($scope.listas, function(value, key) {
                    if (value.id == response.id) {
                        $scope.listas.splice(key, 1);
                    }
                });
            }, function (response) {
                $scope.deleteResponse.notifyShow = true;
                setTimeout(function(){$scope.deleteResponse.notifyShow = false;}, 5000);
                $scope.deleteResponse.type = 'error';
                $scope.deleteResponse.message = response.mensaje;
            });
        };
        
        $scope.nuevaLista = function(){
          Lista.listaVigente = {};
          $state.go('app.nuevaLista');
        };
        
        $scope.nuevaCompra = function(){
          Lista.listaVigente = {};
          $state.go('app.nuevaCompra');
        };

}])