angular.module('EPA.services', ['EPA.config', 'ngResource'])

.config(['$httpProvider', function($httpProvider) {
        // Allow cross site requests
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
}])

.factory('User',
        ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
function userFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
{
    var currentUser,
        isLoggedIn = false,
        permissions;

    return {
        login: function (user, password) {
            isLoggedIn = true;
            var params = {
                username: user,
                password: password
            };
            var deferred = $q.defer();

            $http.post(CONFIG.WS_URL+"/app/login", params)
                 .success(function (result, status, headers){
                    var response = {
                        code: status,
                        type: "success"
                    };
                    response.message = "Login satisfactorio";
                    $state.go('app.menu');
                    $timeout(function(){
                        deferred.resolve(response);
                    });
                 })
                .error(function (result, status, headers) {
                    var response = {
                        code: status,
                        type: "error"
                    };
                    if (status == 403) {  // Login Failed
                        response.message = "Usuario o password incorrectos";
                    } else {   // Server Error
                        response.message = "Ocurrió un error inesperado";
                    }
                    $timeout(function(){
                        deferred.resolve(response);
                    });
                });
            return deferred.promise;
        },
        logout: function () {
            isLoggedIn = false;
            $state.go('app.login');
        },
        isLoggedIn: function () {
            return isLoggedIn;
        },
        currentUser: function () {
            return currentUser;
        },
        isAllowedToDo: function () {

        }
    };
}])

.factory('Lista',
    ['CONFIG', 'Resource',
        function listaFactory (CONFIG, Resource)
        {
            var urlBase = CONFIG.WS_URL+'/app/lista';
            var cacheKey = 'listas'

            Resource.init(cacheKey);

            return {
                get : function (idLista, options) {
                    return Resource.get(idLista, cacheKey, options);
                },
                insert: function (lista, options) {
                    return Resource.insert(lista, cacheKey, options);
                },
                update: function (lista, options) {
                    return Resource.update(lista, cacheKey, options);
                },
                delete: function (lista, options) {
                    return Resource.delete(lista, cacheKey, options);
                }
            };
        }])

    .factory('Producto',
        ['CONFIG', 'Resource',
            function productoFactory (CONFIG, Resource)
            {
                var urlBase = CONFIG.WS_URL+'/app/productos';
                var cacheKey = 'productos'

                Resource.init(cacheKey);

                return {
                    get : function (idProducto, options) {
                        return Resource.get(idProducto, cacheKey, options);
                    },
                    insert: function (producto, options) {
                        return Resource.insert(producto, cacheKey, options);
                    },
                    update: function (producto, options) {
                        return Resource.update(producto, cacheKey, options);
                    },
                    delete: function (producto, options) {
                        return Resource.delete(producto, cacheKey, options);
                    }
                }
            }])


    .factory('Resource',
        ['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', 'CONFIG', 'Cache',
            function listaFactory ($http, $state, $rootScope, $q, $timeout, $resource, CONFIG, Cache)
            {
                var urlDefault = CONFIG.WS_URL;

                return {
                    init: function(cacheKey) {
                        Cache.set(cacheKey, {});
                    },
                    get : function (id, cacheKey, options) {
                        var defaultOptions = {
                            refreshCache : false,
                            url :          urlDefault+"/app/"+cacheKey
                        }
                        options = angular.extend(defaultOptions, options);

                        var deferred = $q.defer();
                        var result = false,
                            resource = false;

<<<<<<< Updated upstream
                        res.get(function (response) {
                            if (response.codigo != 0) {
                                //@TODO: throw exception
=======
                        if (id != 'undefined' && !options.refreshCache) {
                            resource = Cache.get(cacheKey);
                            if (typeof resource[id] != 'undefined') {
                                deferred.resolve(resource[id]);
                                result = true;
>>>>>>> Stashed changes
                            }
                        }

<<<<<<< Updated upstream
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
        }])
=======
                        if (!result) {
                            var res = this.resource('/'+id+'/', null, options);

                            res.get(function (response) {
                                if (response.code != 0) {
                                    //@TODO: throw exception
                                }
                                deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                                for(var id in response.data) {
                                    if (!resource) {
                                        resource = Cache.get(cacheKey);
                                    }
                                    resource[response.data[id].id] = response.data[id];
                                }
                                Cache.set(cacheKey, resource);
                            });
                        }

                        return deferred.promise;
                    },
                    insert: function (object, cacheKey, options) {
                        var defaultOptions = {
                            url :          urlDefault+"/app/"+cacheKey
                        }
                        options = angular.extend(defaultOptions, options);

                        var deferred = $q.defer();
                        var res = this.resource('/', object.id, options);
>>>>>>> Stashed changes

                        res.post(function (response) {
                            if (response.code != 0) {
                                //@TODO: throw exception
                            }
                            var objectList = Cache.get(cacheKey);
                            object.id = response.data.id;
                            objectList[object.id] = object;
                            Cache.set(cacheKey, objectList);
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                        });

                        return deferred.promise;
                    },
                    update: function (object, cacheKey, options) {
                        var defaultOptions = {
                            url :          urlDefault+"/app/"+cacheKey
                        }
                        options = angular.extend(defaultOptions, options);

                        var deferred = $q.defer();
                        var res = this.resource('/'+object.id, object, options);

                        res.put(function (response) {
                            if (response.code != 0) {
                                //@TODO: throw exception
                            }
                            var objectList = Cache.get(cacheKey);
                            objectList[object.id] = object;
                            Cache.set(cacheKey, objectList);
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                        });

                        return deferred.promise;
                    },
                    delete: function (object, cacheKey, options) {
                        var defaultOptions = {
                            url :          urlDefault+"/app/"+cacheKey
                        }
                        options = angular.extend(defaultOptions, options);

                        var deferred = $q.defer();
                        var res = this.resource('/'+object.id, null, options);

<<<<<<< Updated upstream
                        res.get(function (response) {
                            if (response.codigo != 0) {
=======
                        res.delete(function (response) {
                            if (response.code != 0) {
>>>>>>> Stashed changes
                                //@TODO: throw exception
                            }
                            var objectList = Cache.get(cacheKey);
                            delete objectList[object.id];
                            Cache.set(cacheKey, objectList);
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                        });

                        return deferred.promise;
                    },
                    resource: function (urlVar, params, options) {
                        params = params || {};
                        if (typeof params != "String") {
                            params = JSON.stringify(params);
                        }
                        return $resource(options['url'] + urlVar, params);
                    }
                };
            }])

    .factory('Cache',
        ['CONFIG',
            function cacheFactory (CONFIG)
            {
                var init = function() {
                }

                init();

                return {
                    set: function (key, element) {
                        if (typeof element != "string") {
                            element = JSON.stringify(element);
                        }
                        window.localStorage.setItem(key, element);
                        return element;
                    },
                    get: function (key) {
                        var element = window.localStorage.getItem(key);
                        if (typeof element == "string") {
                            element = JSON.parse(element);
                        }
                        return element;
                    }
                }
            }])

    .factory('Session',
        ['CONFIG', 'Cache',
            function sessionFactory (CONFIG, Cache)
            {
                var init = function() {
                }

                init();

                return {
                    set: function (key, element) {
                        return Cache.set('SESSION_'+key, element);
                    },
                    get: function (key) {
                        return Cache.get('SESSION_'+key);
                    }
                }
            }])

    .factory('QRReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session',
            function qrReaderFactory ($rootScope, $q, $timeout, CONFIG, Session)
            {
                var init = function () {
                    Session.set('QRReads', []);
                }

                init();

                return {
                    read: function () {
                        var scanner = cordova.plugins.barcodeScanner;
                        scanner.scan(
                            function (result) {
                                var reads = Session.get('QRReads');
                                reads.push(result);
                                return Session.set('QRReads', reads);
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                            });
                    }
                };
            }])

;