angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state','$location' , 'Session', 'Lista',
    function($scope, $state, $location, Session, Lista) {
        $scope.createdList = Session.get('createdList') || {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Lista";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
            Session.set('createdList', this.createdList);
        }

        $scope.deleteAllItems = function () {
            $scope.createdList = {};
            Session.set('createdList', this.createdList);
        }

        $scope.saveList = function () {
            Lista.save(this.createdList).then(function () {
                    var idLista = $scope.createdList.id
                    $scope.createdList = {};
                    var path = '/app/listas/';
                    return $location.path(path+ idLista);                                       
            });
        }

        $scope.newItem = function () {
            Session.set('createdList', $scope.createdList);
            $state.go('app.nuevoItemLista');
        }

        if (typeof $scope.createdList != "object" || $scope.createdList.length == 0) {
            // Lista nueva no creada. Redirecciono para que cargue items
            $state.go('app.nuevoItemLista');
        }
    }
]);