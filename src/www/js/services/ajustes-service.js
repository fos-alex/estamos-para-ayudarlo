angular.module('EPA.services')

    .factory(
        'buscarSucursales', ['$http', 'CONFIG',
            function ajustesFactory($http, CONFIG) {
                return {
                    obtener_sucursales: function (barrio) {
                        return $http.get(CONFIG.WS_URL + "/app/gestormapas/" + barrio);
                    }
                };
            }
        ]);
