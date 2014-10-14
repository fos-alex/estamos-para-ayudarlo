angular.module('EPA.services')

.factory('Producto',
    ['CONFIG', 'Resource',
        function productoFactory (CONFIG, Resource)
        {
            var key = 'productos';

            Resource.init(key);

            return {
                get : function (idProducto, options) {
                    return Resource.get(idProducto, key, options);
                },
                insert: function (producto, options) {
                    return Resource.insert(producto, key, options);
                },
                update: function (producto, options) {
                    return Resource.update(producto, key, options);
                },
                delete: function (producto, options) {
                    return Resource.delete(producto, key, options);
            }
            }
        }]);
