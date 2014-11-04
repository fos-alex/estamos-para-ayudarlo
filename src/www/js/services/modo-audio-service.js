angular.module('EPA.services')

    .factory(
        'ModoAudio', ['$q','CONFIG','$rootScope','$cookies','$filter',
            function($q,CONFIG,$rootScope,$cookies,$filter) {
                return {
                    enable: function(){
                        $rootScope.configuracion.modoaudio = true;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    disable: function(){
                        $rootScope.configuracion.modoaudio = false;
                        $cookies.configuracion = $filter('json')($rootScope.configuracion);
                    },
                    status: function(){
                        return $rootScope.configuracion.modoaudio || false;
                    }

                };
            }
        ]);
