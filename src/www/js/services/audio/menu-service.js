angular.module('EPA.services')

    .factory('AudioMenu', ['$q','$state','Voz','Texto',function($q,$state,Voz,Texto) {

    	var api = {};

    	api.element = null;
		api.scope = null;
		api.button = null;
		
	    api.convertirRuta = function(texto){
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
                this.scope.logout();
            }else{
                Texto.reproducir('No reconocido');
            }
	    };

	    api.capturarVoz= function(){
	    	var button = angular.element(this);
            button.addClass('processing');                    
            button.removeClass('record');
            Voz.capturar().then(
                function(texto){
                    button.removeClass('processing');                    
                    button.addClass('record');
                    button.data('api').convertirRuta(texto);
                },function(){
                    button.removeClass('processing');                    
                    button.addClass('record');
                    Texto.reproducir('No reconocido');
                }
            );
        };    	

    	api.init = function(scope,element){
    		this.button = angular.element("<div><i class='ion-android-microphone record'></i><i class='ion-android-volume playing'></i><i class='ion-loading-a processing'></i></div>");
			this.button.addClass('modo-audio-button');
			this.scope = scope;
			this.element = element;
    	};

    	api.run = function(){
			this.element.prepend(this.button);
            this.button.removeClass('active');
            Texto.reproducir('Presione la pantalla');
            this.button.addClass('active');
            this.button.addClass('record');
            this.button.data('api',api);
            this.button.on('click',api.capturarVoz);
    	};

    	return api;
    						

}]);