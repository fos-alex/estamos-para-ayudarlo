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
                            if (response.code != 0) {
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
                    debugger;
                    var defaultOptions = {
                        refreshCache : false
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/', lista);

                    res.post(function (response) {
                        if (response.code != 0) {
                            //@TODO: throw exception
                        }
                        var listas = Cache.get('listas');
                        lista.id = response.data.id;
                        listas[lista.id] = lista;
                        Cache.set('listas', listas);
                        deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                    });

                    return deferred.promise;
                },
                update: function (lista) {
                    return $http.put(urlBase+"/"+lista.id, lista);
                },
                resource: function (urlVar, params) {
                    params = params || {};
                    if (typeof params != "String") {
                        params = JSON.stringify(params);
                    }
                    return $resource(urlBase + urlVar, params);
                }
            };
        }])

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
                            if (response.code != 0) {
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