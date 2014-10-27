angular.module('EPA.controllers')

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams','$ionicPopup' , 'Lista', 'Session', 'User','Map', 
    function($scope, $state, $stateParams,$ionicPopup , Lista , Session, User, Map) {

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
            debugger;
            if (Session.get('createdList').id === $scope.lista.id) {
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

        $scope.comprar = function () {
            $scope.rubros = [];
            $scope.rubroslista = [];
            for(var i=0; i< $scope.lista.productos.length ;i++) {
                if ($scope.rubros.indexOf($scope.lista.productos[i].id_categoria) === -1) {
                        $scope.rubros[i] = $scope.lista.productos[i].id_categoria;
                    }                
            }        
            Map.load($scope.rubros);
            $state.go('app.map');
        };        
        
    }
]);