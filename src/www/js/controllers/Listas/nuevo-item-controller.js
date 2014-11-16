angular.module('EPA.controllers')

.controller('NuevoItemListaCtrl', ['$scope', '$state', '$ionicPopup', 'Lista', 'Producto',
    function($scope, $state, $ionicPopup, Lista, Producto) {
        $scope.createdList = Lista.listaVigente || {};

        $scope.acceptList = function () {
            this.createdList = angular.extend(this.createdList, {
                productos: []
            });

            angular.forEach(this.itemsDisponibles, function (value, key) {
                if (value.added) {
                    this.createdList.productos.push(value);
                }
            }, this);

            Lista.listaVigente = this.createdList;
            $state.go('app.nuevaLista');
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
      
        Producto.get("", {refreshCache: true}).then(function(response) {
            $scope.itemsDisponibles = response;
            angular.forEach($scope.itemsDisponibles, function (itemDisponible, key) {
                angular.forEach($scope.createdList.productos, function (itemAgregado, key) {
                    if (itemDisponible.id === itemAgregado.id) {
                        itemDisponible.added = true;
                        itemDisponible.cantidad=itemAgregado.cantidad;
                    }
                }, this);
            }, this);
        });
    }
])