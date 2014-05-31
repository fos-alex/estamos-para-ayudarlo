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
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', 'CONFIG',
        function listaFactory ($http, $state, $rootScope, $q, $timeout, $resource, CONFIG)
        {
  //          var urlBase = CONFIG.WS_URL+'/app/lista';
            var urlBase = 'http://localhost/EPA/src/www/mocks/lista';
/*
            var listas = {
                1: {
                id: 1,
                    title: 'Supermercado COTO',
                    items:[
                    {title: "Agua",  id: 1, descripcion: "Agua Evian" },
                    {title: "Leche", id: 2, descripcion: "Leche la Serenísima" }
                ]
            },
                2: {
                id: 2,
                    title: 'Supermercado Dia',
                    items:[
                    {title: "Agua",  id: 1, descripcion: "Agua Evian" },
                    {title: "Dulce de Leche", id: 4, descripcion: "Claramente la Serenísima Colonial"}
                ]
            }
            };*/

            var init = function() {
                window.localStorage.setItem('listas', JSON.stringify({}));
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
                        listas = JSON.parse(window.localStorage.getItem('listas'));
                        if (typeof listas[idLista] != 'undefined') {
                            deferred.resolve(listas[idLista]);
                            result = true;
                        }
                    }

                    if (!result) {
                        var res = this.resource('/?id='+idLista);

                        res.get(function (response) {
                            if (response.code != 0) {
                                //@TODO: throw exception
                            }
                            debugger;
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                            for(var id in response.data) {
                                if (!listas) {
                                    listas = JSON.parse(window.localStorage.getItem('listas'));
                                }
                                listas[response.data[id].id] = response.data[id];
                                window.localStorage.setItem('listas', JSON.stringify(listas));
                            }
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
            };
        }])

.factory('Producto',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
        function productoFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
        {
            var urlBase = CONFIG.WS_URL+'/app/producto';

            var productos = [
                {title: "Agua",         id: 1, descripcion: "Agua Evian" },
                {title: "Leche",        id: 2, descripcion: "Leche la Serenísima" },
                {title: "Manteca",      id: 3, descripcion: "Danica Dorada era para untar"},
                {title: "Dulce de Leche", id: 4, descripcion: "Claramente la Serenísima Colonial"}
            ];
            return {
                get : function (idProducto) {
                    if (idProducto == undefined) {
                        //idProducto = '';
                        return productos;
                    }
                    return productos[idProducto];

                    //@TODO: quitar return anterior con info hardcoded
                    return $http.get(urlBase+"/"+idProducto);
                },
                insert: function (producto) {
                    return $http.post(urlBase, producto);
                },
                update: function (producto) {
                    return $http.put(urlBase+"/"+producto.id, producto);
                }
            };
        }]);