angular.module('EPA.services')

    .factory('estadisticas',
        ['$http' ,'$state', 'CONFIG',
            function estadisticasFactory ($http, $state, CONFIG)
            {
                return {

                    getTotal: function(mes){
                        return $http.get(CONFIG.WS_URL + "/app/estadisticas/"+ mes + "/0");
                    },
                    getMes: function(mes){
                        return $http.get(CONFIG.WS_URL + "/app/estadisticas/"+ mes + "/1");
                    }
                };

            }]);

