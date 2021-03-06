angular.module('EPA.services')

    .factory('Texto', ['$q','CONFIG',function($q,CONFIG) {
                var language = "es-AR";

                if (typeof cordova === 'undefined') {
                    // Devuelvo un service de texto si estoy por web
                    return {
                        reproducir: function (texto) {
                            var deferred = $q.defer();
                            setTimeout(function(){
                                alert(texto);
                                deferred.resolve();
                            },2000);
                            return deferred.promise;
                        }
                    }
                }

                return {
                    reproducir: function(texto){
                        var deferred = $q.defer();
                        navigator.tts.startup(function(){
                            navigator.tts.setLanguage(language, function(){
                                navigator.tts.speak(texto, function(){
                                    deferred.resolve();
                                },function(){
                                    deferred.reject();    
                                });
                            },function(error){
                                deferred.reject();    
                            });
                        },function(error){                            
                            deferred.reject();
                        });
                        return deferred.promise;
                    }                    
                };
            }
        ]);
