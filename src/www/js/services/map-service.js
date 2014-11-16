angular.module('EPA.services')

.factory('Map',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
        function mapFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
        {
            var map = {
                categorias: [],
                idSucursal: null
            };

            return {
                load: function (categorias, posicion) {
                    map.categorias = categorias;
                    map.posicion = posicion;
                    return this;
                },
                addCategoria: function (categoria) {
                    map.categorias.push(categoria);
                    return this;
                },
                getCategorias: function () {
                    return map.categorias;
                },
                setCategorias: function (categorias) {
                    map.categorias = categorias;
                    return this;
                },
                removeCategoria: function (categoria) {
                    var categorias = this.getCategorias();
                    if (!categorias || categorias.length === 0) {
                        return this;
                    }
                    var inCategorias = categorias.indexOf(categoria);
                    if (inCategorias !== -1) {
                        delete categorias[inCategorias];
                    }
                    return this;
                },
                getPosicion: function () {
                    return map.posicion;
                },
                setPosicion: function (posicion) {
                    this.removeCategoria(posicion);
                    map.posicion = posicion;
                    return this;
                },
                getSucursal: function () {
                    return map.idSucursal;
                },
                setSucursal: function (idSucursal) {
                    map.idSucursal = idSucursal;
                    return this;
                },
                refresh: function () {
                    map.refresh = true;
                    return this;
                },
                restartRefresh: function () {
                    map.refresh = false;
                    return this;
                },
                getRefresh: function () {
                    return map.refresh;
                },
                getConfig: function () {
                    return {
                        config: {
                            categories:         this.getCategorias() || [],
                            idSucursal:     this.getSucursal() || null,
                            position:       this.getPosicion() || "entrance"
                        },
                        refresh:        map.refresh || false
                    };
                }
            };
        }])
