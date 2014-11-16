angular.module('EPA.controllers')

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams','$ionicPopup' , 'Lista', 'User',
    function($scope, $state, $stateParams, $ionicPopup, Lista, User) {

        if (User.currentUser() != null){
           $scope.currentUser = User.currentUser().username;
        };
        $scope.tienePermiso = true;

        Lista.get($stateParams.idLista, {}).then(function(response) {
            $scope.lista = response;
            
            if ($scope.lista.bloqueada === '1'){
                if($scope.currentUser === $scope.lista.edita){
                    $scope.tienePermiso = true;
                }else{
                    $scope.tienePermiso = false;
                };
            };
        });

        $scope.editList = function () {
            Lista.listaVigente = $scope.lista;
            $state.go('app.nuevoItemLista');
        };

        $scope.showConfirm = function() {
            debugger;
            if (Lista.listaVigente.id === $scope.lista.id) {
                $ionicPopup.confirm({
                    title: 'Confirmación?',
                    template: '¿Estás seguro que deseas salir?'
                }).then(function(res) {
                    if(res) {
                        $state.go('app.listas');
                    }
                });
            } else {
                $state.go('app.listas');
            }
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