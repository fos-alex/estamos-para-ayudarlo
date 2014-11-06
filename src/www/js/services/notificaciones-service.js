angular.module('EPA.services')

    .factory(
        'Notificaciones', ['$q','CONFIG','$rootScope','$cookies','$filter',
            function($q,CONFIG,$rootScope,$cookies,$filter) {
                return {
                    enable_promos: function(){
                        $rootScope.configuracion.notificacion_promo = true;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    disable_promos: function(){
                        $rootScope.configuracion.notificacion_promo = false;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    status_promos: function(){
                        return $rootScope.configuracion.notificacion_promo || false;
                    },
                    enable_cerca: function(){
                        $rootScope.configuracion.notificacion_cerca = true;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    disable_cerca: function(){
                        $rootScope.configuracion.notificacion_cerca = false;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    status_cerca: function(){
                        return $rootScope.configuracion.notificacion_cerca || false;
                    }

                };
            }
        ]);
