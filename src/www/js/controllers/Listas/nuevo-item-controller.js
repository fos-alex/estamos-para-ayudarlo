angular.module('EPA.controllers')

.controller('NuevoItemListaCtrl', ['$scope', '$state', 'Producto', 'Session',
    function($scope, $state, Producto, Session) {
        $scope.createdList = Session.get('createdList') || {};

        $scope.acceptList = function () {
            this.createdList = angular.extend(this.createdList, {
                productos: []
            });

            angular.forEach(this.itemsDisponibles, function (value, key) {
                if (value.added) {
                    this.createdList.productos.push(value);
                }
            }, this);

            Session.set('createdList', this.createdList);
            $state.go('app.nuevaLista');
        }

        Producto.get("", {refreshCache: true}).then(function(response) {
            response = angular.extend(response, $scope.createdList.productos);
            $scope.itemsDisponibles = response;
        });
    }
])