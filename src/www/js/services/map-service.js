angular.module('EPA.services')

.factory('Map',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
        function mapFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
        {
            var map = {};

            return {
                load: function (categorias, posicion) {
                    map.categorias = categorias;
                    map.posicion = posicion;
                    return this;
                },
                getCategorias: function () {
                    return map.categorias;
                },
                setCategorias: function (categorias) {
                    map.categorias = categorias;
                    return this;
                },
                getPosicion: function () {
                    return map.posicion;
                },
                setPosicion: function (posicion) {
                    map.posicion = posicion;
                    return this;
                }
            };
        }])
