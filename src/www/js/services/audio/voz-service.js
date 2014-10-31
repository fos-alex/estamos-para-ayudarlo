angular.module('EPA.services')

    .factory(
        'Voz', ['$q','CONFIG',
            function ajustesFactory($q,CONFIG) {
                return {
                    capturar: function () {
                        var deferred = $q.defer();
                        var txt = window.prompt('asds');
                        if(txt){
                            deferred.resolve(txt);    
                        }else{
                            deferred.reject();    
                        }
                        return deferred.promise;
                    }                    
                };
            }
        ]);
