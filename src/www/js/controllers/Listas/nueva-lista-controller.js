angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state','$location', '$ionicPopup' , 'Session', 'Lista', 'QRReader', 'ProductoDetalle','Map',
    function($scope, $state, $location, $ionicPopup, Session, Lista, QRReader, ProductoDetalle, Map) {
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

        $scope.leerQr = function(){
        //REALIZAR SCAN DE PRODUCTO
//            QRReader.read(function (err, response) {
//                $scope.id_producto = response.producto.id;
//                $scope.categoriaActual = response.producto.id;
//            });

            $scope.id_producto_detalle = 100;
            $scope.id_producto = 60;
            $scope.buscarProducto($scope.id_producto_detalle);
            $scope.categoria_actual = 'Almacen';

        }

        $scope.buscarProducto = function(id){
            ProductoDetalle.get(id).then(
                function(response){
                    $scope.productoNuevo = response.data.data;
                    $scope.agregarProducto($scope.productoNuevo);
                },
                function(error){
                }
            );
        };

        $scope.agregarProducto= function(productoNuevo){
            //AGREGO PRODUCTO A LA LISTA DE COMPRAS ON DEMAND
            if (typeof $scope.createdList.productos !== "object" || $scope.createdList.productos.length === 0){
                this.createdList = angular.extend(this.createdList, {
                    productos: []
                });
                this.createdList.productos.push(productoNuevo);
                Session.set('createdList', this.createdList);
            } else {
                $scope.createdList.productos.push(productoNuevo);
            }
            Lista.save(this.createdList); //@TODO: SAVE DE LISTA DETALLE
        };
        
        $scope.aumentarCantidad = function (producto){
            producto.cantidad = (producto.cantidad > 0)? producto.cantidad + 1: 1
            Lista.save(this.createdList);
        };
        
        $scope.disminuirCantidad = function (producto){
            producto.cantidad = (producto.cantidad > 0)? producto.cantidad - 1: 1
            Lista.save(this.createdList);
        };
        
        $scope.muestraSuma = false;
        $scope.suma = function () {
            $scope.muestraSuma = true;
            $scope.totalSuma = 0;
            var total = 0;
            for(var i = 0; i < $scope.createdList.productos.length; i++){
                var item = $scope.createdList.productos[i];
                debugger;
                total += item.precio * item.cantidad;
            }
            $scope.totalSuma = total;
        };
        
      $scope.calcularRecorrido = function(){
            $scope.rubros = [];
            $scope.rubroslista = [];
            for(var i=0; i< this.createdList.productos.length ;i++) {
                if ($scope.rubros.indexOf(this.createdList.productos[i].id_categoria) === -1) {
                        $scope.rubros[i] = this.createdList.productos[i].id_categoria;
                    }                
            }        
            Map.load($scope.rubros, $scope.categoriaActual);
            $state.go('app.map');
      }; 
        
}
]);