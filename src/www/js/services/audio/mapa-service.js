angular.module('EPA.services')

    .factory('AudioMapa', ['$q','$state','Voz','Texto','Map',function($q,$state,Voz,Texto,Map) {

    	var api = {};

    	api.element = null;
		api.scope = null;
		api.button = null;

	    api.agregarCategoria = function(texto){
	    	var categoria;
            if( /lacteos/.test(texto) ){
                categoria='Lacteos';
            }else if( /pan/.test(texto) ){
                categoria='Panificados';
            }else{
                Texto.reproducir('No reconocido');
                return;
            }
            Map.addCategoria(categoria);
            Map.refresh();
	    };

	    api.capturarVoz= function(){
	    	var button = angular.element(this);
            Voz.capturar().then(
                function(texto){
                    button.data('api').agregarCategoria(texto);
                },function(){
                    Texto.reproducir('No reconocido');
                }
            );
        };  

    	api.init = function(scope,element){
    		this.button = angular.element('<a class="tab-item"><i class="icon ion-android-microphone footerIconos"></i></a>');
			this.scope = scope;
			this.element = element;
    	};

    	api.run = function(){
			this.element.find('ion-footer-bar').prepend(this.button);
            this.button.data('api',api);
            this.button.on('click',api.capturarVoz);
    	};

    	return api;
    						

}]);