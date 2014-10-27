angular.module('EPA.services')

.factory('Map',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
        function mapFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
        {
            var map = {};

            return {
                load: function (categorias) {
                    map.categorias = categorias;
                    return this;
                },
                getCategorias: function () {
                    return map.categorias;
                },
                setCategorias: function (categorias) {
                    map.categorias = categorias;
                    return this;
                }
            };
        }])
