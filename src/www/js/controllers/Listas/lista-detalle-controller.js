angular.module('EPA.controllers')

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams','$ionicPopup' , 'Lista', 'Session', 'User',
    function($scope, $state, $stateParams,$ionicPopup , Lista , Session, User) {

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