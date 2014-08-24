angular.module('EPA.services')

.factory('Lista',
    ['$http', 'CONFIG', 'Resource',
        function listaFactory ($http, CONFIG, Resource)
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
                },
                compartir: function (lista, mail) {
                    //debugger;
                    return $http.post(CONFIG.WS_URL + '/app/compartir/' + lista, {
                        mail: mail
                    });
                }
            };
        }]);