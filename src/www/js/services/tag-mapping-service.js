angular.module('EPA.services')

.factory('TagMapping',
    ['$http', 'CONFIG', 'Resource',
    function tagMappingFactory ($http, CONFIG, Resource)
        {
            var map = {
                d: "descripcion",
                idg: "id_generico",
                n: "nombre",
                d: "descripcion",
                p: "precio",
                c: "categoria",
                i: "imagen"
            };

            return {
                mapObjectKeys: function (obj) {
                    var tmp = {};
                    for (var key in obj) {
                        var newKey = map[key] || key;
                        tmp[newKey] = obj[key];
                    }
                    return tmp;
                }
            }

        }
]);