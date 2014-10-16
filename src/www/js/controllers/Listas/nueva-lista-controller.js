angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state','$location', '$ionicPopup' , 'Session', 'Lista', 'QRReader',
    function($scope, $state, $location, $ionicPopup, Session, Lista, QRReader) {
        $scope.createdList = Session.get('createdList') || {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Lista";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
            Session.set('createdList', this.createdList);
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
        
        /*COMPRA ON DEMAND*/

        $scope.agregarProducto = function () {
                        //REALIZAR SCAN DE PRODUCTO

//            QRReader.read(function (err, response) {
//                $scope.id_producto = response.producto.id;
//            });

//          CONSULTAR INFO DE PRODUCTO : id, descripcion, categoria y precio
//          to-do servicio
            //$scope.productoNuevo = {id, descripcion, categoria, precio};
            $scope.productoNuevo = {'id':'1', 'descripcion':'coca', 'categoria':'4', 'precio':'20'};

            //AGREGAR EL PRODUCTO ESCANEADO A LA LISTA

            if ($scope.createdList.productos != "object" || $scope.createdList.productos.length == 0){
                this.createdList = angular.extend(this.createdList, {
                    productos: []
                });
                this.createdList.productos.push($scope.productoNuevo);
                Session.set('createdList', this.createdList);
            } else {
                $scope.createdList.productos.push($scope.productoNuevo);
            }
            Lista.save(this.createdList);
            
            // ENVIAR AL MAPA LA POSICION ACTUAL Y LISTA CON LA CATEGORIA ACTUAL
            // to-do
        }

        $scope.muestraSuma = false;
        $scope.suma = function () {
            $scope.muestraSuma = true;
            $scope.totalSuma = 0;
            var total = 0;
            for(var i = 0; i < $scope.createdList.productos.length; i++){
                var item = $scope.createdList.productos[i];
                total = total + item.precio; //ver tema cantidad
            }
            $scope.totalSuma = total;
        }

}
]);