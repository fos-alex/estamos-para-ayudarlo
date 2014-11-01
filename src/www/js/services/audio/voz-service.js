angular.module('EPA.services')

    .factory(
        'Voz', ['$q','CONFIG',
            function ajustesFactory($q,CONFIG) {
                var maxMatches = 5;
                var language = "es-AR";
                return {
                    capturar_disabled: function () {
                        var deferred = $q.defer();
                        var txt = window.prompt('asds');
                        if(txt){
                            deferred.resolve(txt);    
                        }else{
                            deferred.reject();    
                        }
                        return deferred.promise;
                    },                    
                    capturar: function(){
                        var deferred = $q.defer();
                        var resultCallback = function(result){
                            var txt = result.results[0][0].transcript;
                            deferred.resolve(txt);    
                        };
                        var errorCallback = function(error){
                            deferred.reject(error);
                        };
                        window.plugins.speechrecognizer.start(resultCallback, errorCallback, 
                            maxMatches, language);
                        return deferred.promise;
                    }
                };
            }
        ]);
