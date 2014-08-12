angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state', 'Session', 'Lista',
    function($scope, $state, Session, Lista) {
        $scope.createdList = Session.get('createdList') || {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Lista";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
            Session.set('createdList', this.createdList);
        }

        $scope.editTitle = function () {
            var text = jQuery(".title").text();
            var input = jQuery('<input class="titleInput" type="text" value="' + text + '" />');
            jQuery('.title').text('').append(input);
            input.select();

            input.blur(function() {
                var text = jQuery('.titleInput').val();
                jQuery('.titleInput').parent().text(text);
                jQuery('.titleInput').remove();
            });
        }

        $scope.deleteAllItems = function () {
            $scope.createdList = {};
            Session.set('createdList', this.createdList);
        }

        $scope.saveList = function () {
            Lista.save(this.createdList).then(function () {
                $scope.createdList = {};
                $state.go('app.listas');
            });
        }

        if (typeof $scope.createdList != "object" || $scope.createdList.length == 0) {
            // Lista nueva no creada. Redirecciono para que cargue items
            $state.go('app.nuevoItemLista');
        }
    }
]);