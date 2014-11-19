angular.module('EPA.services')

    .factory('AudioProducto', ['$q','$state','Voz','Texto',function($q,$state,Voz,Texto) {

    	var api = {};

    	api.element = null;
		api.scope = null;
		api.button = null;
		
	   	api.init = function(scope,element){
    		this.scope = scope;
	   	};

    	api.run = function(){
            var producto = this.scope.$parent.producto;
	        Texto.reproducir('producto ' + producto.nombre).then(
                function(){
                    Texto.reproducir('precio ' + producto.precio).then(
                            function(){
                                if(producto.id>=10000){
                                    Texto.reproducir('precio cuidado');    
                                }
                            }
                        );
                }
            );
    	};

    	return api;
    						

}]);
