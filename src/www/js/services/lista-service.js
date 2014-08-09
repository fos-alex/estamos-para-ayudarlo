angular.module('EPA.services')

.factory('Lista',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', 'CONFIG', 'Cache',
        function listaFactory ($http, $state, $rootScope, $q, $timeout, $resource, CONFIG, Cache)
        {
            var urlBase = CONFIG.WS_URL+'/app/lista';
//            var urlBase = 'http://localhost/EPA/src/www/mocks/lista';

            var init = function() {
                Cache.set('listas', {});
            }

            init();

            return {
                get : function (idLista, options) {
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var result = false,
                        listas = false;

                    if (idLista != 'undefined' && !options.refreshCache) {
                        listas = Cache.get('listas');
                        if (typeof listas[idLista] != 'undefined') {
                            deferred.resolve(listas[idLista]);
                            result = true;
                        }
                    }

                    if (!result) {
                        var res = this.resource('/'+idLista+'/');

                        res.get(function (response) {
                            if (response.codigo != 0) {
                                //@TODO: throw exception
                            }
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                            for(var id in response.data) {
                                if (!listas) {
                                    listas = Cache.get('listas');
                                }
                                listas[response.data[id].id] = response.data[id];
                            }
                            Cache.set('listas', listas);
                        });
                    }

                    return deferred.promise;
                },
                insert: function (lista, options) {
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/');

                    res.save(lista, function (response) {
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                        }
                        var listas = Cache.get('listas');
                        lista.id = response.data.id;
                        listas[lista.id] = lista;
                        Cache.set('listas', listas);
                        deferred.resolve(response.data);
                    });

                    return deferred.promise;
                },
                update: function (lista, options) {
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/:id');

                    res.update({id: lista.id}, lista, function (response) {
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                        }
                        var listas = Cache.get('listas');
                        listas[lista.id] = lista;
                        Cache.set('listas', listas);
                        deferred.resolve(response.data);
                    });

                    return deferred.promise;
                },
                delete: function (lista, options) {
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/:id');

                    res.delete({id: lista.id}, lista, function (response) {
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                        }
                        var listas = Cache.get('listas');
                        delete listas[lista.id];
                        Cache.set('listas', listas);
                        deferred.resolve(response.data);
                    });

                    return deferred.promise;
                },
                save: function (lista) {
                    if (lista.id != 'undefined') {
                        return this.update(lista);
                    } else {
                        return this.insert(lista);
                    }
                },
                resource: function (urlVar, params) {
                    params = params || {};
/*                    if (typeof params != "String") {
                        params = JSON.stringify(params);
                    }*/
                    return $resource(urlBase + urlVar, params, {
                        update: {method: 'PUT'}
                    });
                }
            };
        }]);