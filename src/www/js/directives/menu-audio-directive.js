angular.module('EPA.directives')

.directive('menuAudio', ['$rootScope','$ionicLoading','$q','$state','ModoAudio','Voz','Texto',function($rootScope,$ionicLoading,$q,$state,ModoAudio,Voz,Texto){
    var scopeActual = null;
    var config = {
        ruta:true,
        callback:function(){}
    };

    var button = angular.element("<div><i class='ion-android-microphone record'></i><i class='ion-android-volume playing'></i><i class='ion-loading-a processing'></i></div>");
    button.addClass('modo-audio-button');

    var convertirRuta = function(texto){
                if( /ajuste/.test(texto) ||
                    /configura/.test(texto) ){
                    $state.go('app.ajustes');
                }else if( /^compra/.test(texto) ){
                    $state.go('app.comprar');
                }else if(/lista/.test(texto)){
                    $state.go('app.listas');
                }else if(/estadística/.test(texto) ||
                    /reporte/.test(texto)){
                    $state.go('app.estadisticas');
                }else if(/mapa/.test(texto)){
                    $state.go('app.map');
                }else if(/menu/.test(texto) ||
                    /inicio/.test(texto)){
                    $state.go('app.menu');
                }else if(/salir/.test(texto)){
                    scopeActual.logout();
                }else{
                    Texto.reproducir('No reconocido');
                }
    };

    var capturarVoz= function(){
                    button.addClass('processing');                    
                    button.removeClass('record');
                    Voz.capturar().then(
                        function(texto){
                            button.removeClass('processing');                    
                            button.addClass('record');
                            config.callback(texto);
                        },function(){
                            button.removeClass('processing');                    
                            button.addClass('record');
                            Texto.reproducir('No reconocido');
                        }
                    );
                };

	return {
        restrict: 'A',
        link: function(scope, element, attrs){ 
            element.prepend(button);
            button.removeClass('active');
            scope.$watch(attrs.menuAudioConfig,function(value){
                scopeActual = scope;
                config = value || config;    
                config.callback = config.ruta && convertirRuta || scope[config.callback];
                if(ModoAudio.status()){
                    Texto.reproducir('Presione la pantalla');
                    button.addClass('active');
                    button.addClass('record');
                    button.on('click',capturarVoz);
                }
            });
        }
    };

}]);
