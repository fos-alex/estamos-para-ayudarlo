angular.module('EPA.controllers')

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams','$ionicPopup' , 'Lista', 'Session',
    function($scope, $state, $stateParams,$ionicPopup , Lista , Session) {
        Lista.get($stateParams.idLista, {}).then(function(response) {
            $scope.lista = response;
        });

        $scope.editList = function () {
            Session.set('createdList', $scope.lista);
            $state.go('app.nuevoItemLista');
        };

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