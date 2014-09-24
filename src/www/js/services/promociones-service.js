angular.module('EPA.services')

    .factory('Promociones',
        ['$http', 'CONFIG', 'Resource',
            function promocionesFactory ($http, CONFIG, Resource)
            {
                var key = 'promociones';

                Resource.init(key);

                return {
                    get : function () {
                        return Resource.get(undefined, key, {refreshCache:true});
                    }

                };
            }]);

