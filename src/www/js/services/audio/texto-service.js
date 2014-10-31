angular.module('EPA.services')

    .factory(
        'Texto', ['$q','CONFIG',
            function ajustesFactory($q,CONFIG) {
                return {
                    reproducir: function (texto) {
                        var deferred = $q.defer();
                        setTimeout(function(){
                            alert(texto);
                            deferred.resolve();
                        },2000);
                        return deferred.promise;
                    }                    
                };
            }
        ]);
