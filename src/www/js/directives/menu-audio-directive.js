angular.module('EPA.directives')

/*appId : 1504374299806491
secret : 42d757114f3ae3d6dd4bd0b68fcf335a
*/

.directive('menuAudio', ['$rootScope','$ionicLoading','$q','$state','ModoAudio','Voz','Texto',function($rootScope,$ionicLoading,$q,$state,ModoAudio,Voz,Texto){
    var config = {
        ruta:true,
        callback:function(){}
    };

    var button = angular.element("<div><i class='ion-android-microphone record'></i><i class='ion-android-volume playing'></i></div>");
    button.addClass('modo-audio-button');

    var convertirRuta = function(texto){
                if( /ajuste/.test(texto) ||
                    /configura/.test(texto) ){
                    $state.go('app.ajustes');
                }else if( /compra/.test(texto) ){
                    $state.go('app.comprar');
                }else if(/lista/.test(texto)){
                    $state.go('app.listas');
                }else if(/estadistica/.test(texto)){
                    $state.go('app.estadisticas');
                }else if(/mapa/.test(texto)){
                    $state.go('app.map');
                }else{

                }

    };

    var capturarVoz= function(){
                    Voz.capturar().then(
                        function(texto){
                            config.callback(texto);
                        },function(){
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
                config = value || config;    
                config.callback = config.ruta && convertirRuta || scope[config.callback];
                if(ModoAudio.status()){
                    button.addClass('active');
                    button.addClass('record');
                    button.on('click',capturarVoz);
                }
            });
        }
    };

}]);
