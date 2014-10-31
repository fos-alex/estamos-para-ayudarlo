angular.module('EPA.services')

    .factory(
        'ModoAudio', ['$q','CONFIG','$rootScope','$cookies',
            function ajustesFactory($q,CONFIG,$rootScope,$cookies) {
                return {
                    enable: function(){
                        $rootScope.modoaudio = true;
                        $cookies.modoaudio = 'true';
                    },
                    disable: function(){
                        $rootScope.modoaudio = $cookies.modoaudio = false;
                        $cookies.modoaudio = 'false';
                    },
                    status: function(){
                        return $rootScope.modoaudio || false;
                    }
                    /*
                    //PASAR A CONFIG SI ES NECESARIO
                    var maxMatches = 1;
                    var language = "es-AR";
                    reproducir_texto: function (texto) {
                        navigator.tts.startup(function(){
                            navigator.tts.setLanguage(language, function(){
                                navigator.tts.speak(texto, function(){},function(){});
                            },function(error){console.log("ERROR SETLANGUAGE "+error)});
                        },function(error){console.log("ERROR STARTUP "+error)});
                    },
                    obtener_texto: function () {
                        var deferred = $q.defer();
                        var resultCallback = function(result){
                            deferred.resolve(result);
                        };
                        var errorCallback = function(error){
                            deferred.reject(error);
                        };
                        window.plugins.speechrecognizer.start(resultCallback, errorCallback, 
                            maxMatches, language);
                        return deferred.promise;
                    },
                    obtener_menu: function(){
                        
                    }*/

                };
            }
        ]);
