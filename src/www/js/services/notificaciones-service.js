angular.module('EPA.services')

    .factory(
        'Notificaciones', ['$q','CONFIG','$rootScope','$cookies','$filter',
            function($q,CONFIG,$rootScope,$cookies,$filter) {
                return {
                    enablePromos: function(){
                        $rootScope.configuracion.notificacion_promo = true;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    disablePromos: function(){
                        $rootScope.configuracion.notificacion_promo = false;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    statusPromos: function(){
                        return $rootScope.configuracion.notificacion_promo || false;
                    },
                    enableCerca: function(){
                        $rootScope.configuracion.notificacion_cerca = true;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    disableCerca: function(){
                        $rootScope.configuracion.notificacion_cerca = false;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    statusCerca: function(){
                        return $rootScope.configuracion.notificacion_cerca || false;
                    }

                };
            }
        ]);
