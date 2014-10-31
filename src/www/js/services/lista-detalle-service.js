angular.module('EPA.services')

.factory('ListaDetalle',
    ['$http', 'CONFIG', 'Resource',
        function listaDetalleFactory ($http, CONFIG, Resource)
        {
            var key = 'listaDetalle';

            Resource.init(key);

            return {
                get : function (idLista, options) {
                    return Resource.get(idLista, key, options);
                },
                save: function (lista, options) {
                    var listaGenerica = [];
                    for (var producto in lista) {
                        angular.extend(producto, {
                            id: producto.id_producto
                        })
                        listaGenerica.push(producto);
                    }
                    return Resource.save(listaGenerica, key, options);
                }
            };
        }]);