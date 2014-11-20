angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state','$location', '$ionicPopup', 'Lista',
    function($scope, $state, $location, $ionicPopup, Lista) {
        $scope.createdList = {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Lista";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
        }

        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmación?',
                template: '¿Estás seguro que deseas salir?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $state.go('app.listas');
                } else {
                }
            });
        };

        $scope.deleteAllItems = function () {
            $scope.createdList = {};
            Lista.listaVigente = this.createdList;
        }

        $scope.saveList = function () {
            Lista.save(this.createdList).then(function () {
                    var idLista = $scope.createdList.id;
                    $scope.createdList = {};
                    var path = '/app/listas/';
                    return $location.path(path+ idLista);                                       
            });
        }

        $scope.newItem = function () {
            $state.go('app.nuevoItemLista');
        }

        if (typeof $scope.createdList != "object" || $scope.createdList.length == 0) {
            // Lista nueva no creada. Redirecciono para que cargue items
            $state.go('app.nuevoItemLista');
        }
    }
]);