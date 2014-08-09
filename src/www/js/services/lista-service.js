angular.module('EPA.services')

.factory('Lista',
    ['CONFIG', 'Resource',
        function listaFactory (CONFIG, Resource)
        {
            var key = 'lista';

            Resource.init(key);

            return {
                get : function (idLista, options) {
                    return Resource.get(idLista, key, options);
                },
                insert: function (lista, options) {
                    return Resource.insert(lista, key, options);
                },
                update: function (lista, options) {
                    return Resource.update(lista, key, options);
                },
                save: function (lista, options) {
                    return Resource.save(lista, key, options);
                },
                delete: function (lista, options) {
                    return Resource.delete(lista, key, options);
                }
            };
        }]);