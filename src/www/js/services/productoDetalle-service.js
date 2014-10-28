angular.module('EPA.services')

.factory('ProductoDetalle',
    ['$http', 'CONFIG',
        function productoDetalleFactory ($http, CONFIG)
        {
            return {
                get : function (idProducto) {
                    return $http.get(CONFIG.WS_URL + "/app/compraondemand/" + idProducto);
                }
            }
        }]);
