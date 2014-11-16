angular.module('EPA.services')

    .factory('AudioMapa', ['$q','$state','Voz','Texto','Map',function($q,$state,Voz,Texto,Map) {

    	var api = {};

    	api.element = null;
		api.scope = null;
		api.button = null;
        api.loading = null;

	    api.agregarCategoria = function(texto) {
	    	var categoria;
            if ( /l(á|a)cteos/.test(texto) ||
                /leche/.test(texto) ) {
                categoria='Lacteos';
            } else if( /panificados/.test(texto) ) {
                categoria='Panificados';
            } else if( /almac(é|e)n/.test(texto) ) {
                categoria='Almacen';
            } else if( /bebidas/.test(texto) ) {
                categoria='Bebidas';
            } else if( /carnes/.test(texto) ) {
                categoria='Carnes y Procesados';
            } else if( /limpieza/.test(texto) ) {
                categoria='Limpieza';
            } else if( /perfumer(í|i)a/.test(texto) ) {
                categoria='Perfumeria';
            } else {
                Texto.reproducir('No reconocido');
                alert("Producto buscado "+ texto);
                return;
            }
            Map.addCategoria(categoria);
            Map.refresh();
	    };

	    api.capturarVoz= function() {
	    	var button = angular.element(this);
            button.data('api').loading.addClass('active');
            Voz.capturar().then(
                function(texto){
                    button.data('api').loading.removeClass('active');
                    button.data('api').agregarCategoria(texto);
                },function(){
                    button.data('api').loading.removeClass('active');
                    Texto.reproducir('No reconocido');
                }
            );
        };  

    	api.init = function(scope,element) {
    		this.button = angular.element('<a class="tab-item"><i class="icon ion-android-microphone footerIconos"></i></a>');
            this.loading = angular.element("<div class='processing'><i class='ion-loading-a processing'></i></div>");
            this.loading.addClass('modo-audio-button');
            this.loading.removeClass('active');
			this.scope = scope;
			this.element = element;
    	};

    	api.run = function() {
			this.element.find('ion-footer-bar').prepend(this.button);
            this.element.prepend(this.loading);
            this.button.data('api',api);
            this.button.on('click',api.capturarVoz);
    	};

    	return api;
    						

}]);