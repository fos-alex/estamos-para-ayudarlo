angular.module('EPA.controllers')

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams', 'Lista', 'Session',
    function($scope, $state, $stateParams, Lista, Session) {
        Lista.get($stateParams.idLista, {}).then(function(response) {
            $scope.lista = response;
        });

        $scope.editList = function () {
            Session.set('createdList', $scope.lista);
            $state.go('app.nuevoItemLista');
        };

        $scope.deleteList = function () {
            Lista.delete($scope.lista).then(function() {
                $state.go('app.listas');
            });
        };

        $scope.acceptList = function () {
            Lista.save($scope.lista).then(function() {
                $state.go('app.listas');
            });
        };
        
    }
]);