angular.module('EPA.services')

.factory('Producto',
['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', 'CONFIG', 'Cache',
    function productoFactory ($http, $state, $rootScope, $q, $timeout, $resource, CONFIG, Cache)
        {
            var urlBase = CONFIG.WS_URL+'/app/productos';
            //var urlBase = 'http://localhost/EPA/src/www/mocks/producto';

            var init = function() {
                Cache.set('productos', {});
            }

            init();

            return {
                get : function (idProducto, options) {
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var result = false,
                        productos = false;
                    debugger;
                    if (idProducto != 'undefined' && !options.refreshCache) {
                        productos = Cache.get('productos');
                        if (typeof productos[idProducto] != 'undefined') {
                            deferred.resolve(productos[idProducto]);
                            result = true;
                        }
                    }

                    if (!result) {
                        var res = this.resource('/?id='+idProducto);

                        res.get(function (response) {
                            if (response.codigo != 0) {
                                //@TODO: throw exception
                            }
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                            for(var id in response.data) {
                                if (!productos) {
                                    productos = Cache.get('productos');
                                }
                                productos[response.data[id].id] = response.data[id];
                            }
                            Cache.set('productos', productos);
                        });
                    }

                    return deferred.promise;
                },
                insert: function (lista) {
                    return $http.post(urlBase, lista);
                },
                update: function (lista) {
                    return $http.put(urlBase+"/"+lista.id, lista);
                },
                resource: function (urlVar) {
                    return $resource(urlBase + urlVar, {});
                }
            }
        }]);