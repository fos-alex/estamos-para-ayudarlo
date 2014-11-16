angular.module('EPA.controllers')

.controller('NuevaListaCtrl', ['$scope', '$state','$location', '$ionicPopup', 'Lista', 'QRReader', 'ProductoDetalle','Map',
    function($scope, $state, $location, $ionicPopup, Lista, QRReader, ProductoDetalle, Map) {
        $scope.createdList = Lista.listaVigente || {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Compra";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
        };

        $scope.showConfirm = function() {
            $ionicPopup.confirm({
                title: 'Confirmación?',
                template: '¿Estás seguro que deseas salir?'
            }).then(function(res) {
                if (res) {
                    $state.go('app.listas');
                }
            });
        };

        $scope.deleteAllItems = function () {
            $scope.createdList = {};
        };

        $scope.saveList = function () {
            Lista.save(this.createdList).then(function () {
                    var idLista = $scope.createdList.id
                    $scope.createdList = {};
                    var path = '/app/listas/';
                    return $location.path(path+ idLista);                                       
            });
        }

        $scope.newItem = function () {
            $state.go('app.nuevoItemLista');
        }

        if (typeof $scope.createdList != "object" || $scope.createdList.length == 0) {
            // Lista nueva no creada. Redirecciono para que cargue items
            $state.go('app.nuevoItemLista');
        }
        
        /*COMPRA ON DEMAND*/

        $scope.leerQr = function() {
        //REALIZAR SCAN DE PRODUCTO
            QRReader.read(function (err, response) {
                $scope.id_producto = response.id;
                $scope.id_generico = response.id_generico;
                $scope.categoriaActual = response.categoria;
                $scope.buscarProducto($scope.id_producto);
            });
        };

        $scope.buscarProducto = function(id) {
            ProductoDetalle.get(id).then(
                function(response){
                    $scope.productoNuevo = response.data.data;
                    $scope.agregarProducto($scope.productoNuevo);
                }
            );
        };

        $scope.agregarProducto= function(productoNuevo){
            //AGREGO PRODUCTO A LA LISTA DE COMPRAS ON DEMAND
//            if (Lista.listaVigente !== null){
//                this.createdList = Lista.listaVigente;
//            };
            
            if (typeof $scope.createdList.productos !== "object" || $scope.createdList.productos.length === 0){
                this.createdList = angular.extend(this.createdList, {
                    productos: []
                });
                productoNuevo.id = productoNuevo.id_generico; //cuando lo guardo como lista de compra, seteo el id generico como id...
                productoNuevo.cantidad = 1;
                this.createdList.productos.push(productoNuevo);
            } else {
                productoNuevo.id = productoNuevo.id_generico; //cuando lo guardo como lista de compra, seteo el id generico como id...
                productoNuevo.cantidad = 1;                
                $scope.createdList.productos.push(productoNuevo);
            }
            Lista.save(this.createdList); //@TODO: SAVE DE LISTA DETALLE
        };
        
        $scope.aumentarCantidad = function (producto){
            producto.cantidad = (producto.cantidad > 0)? producto.cantidad + 1: 1;
            Lista.save(this.createdList);
        };
        
        $scope.disminuirCantidad = function (producto){
            producto.cantidad = (producto.cantidad > 0)? producto.cantidad - 1: 1;
            Lista.save(this.createdList);
        };
        
        $scope.muestraSuma = false;
        $scope.suma = function () {
            $scope.muestraSuma = true;
            $scope.totalSuma = 0;
            var total = 0;
            for(var i = 0; i < $scope.createdList.productos.length; i++){
                var item = $scope.createdList.productos[i];
                total += item.precio * item.cantidad;
            }
            $scope.totalSuma = total;
        };
        
      $scope.calcularRecorrido = function(){
            $scope.rubros = [];
            $scope.rubroslista = [];
            for(var i=0; i< this.createdList.productos.length ;i++) {
                if ($scope.rubros.length === 1){
                    $scope.rubros[i]= this.createdList.productos[i].categoria;                     
                } else {
                    if ($scope.rubros.indexOf(this.createdList.productos[i].categoria) === -1) {
                        $scope.rubros[i] = this.createdList.productos[i].categoria;
                    }
                }        
            }   
            Map.load($scope.rubros, $scope.categoriaActual);
            $state.go('app.map');
      }; 
        
}
]);