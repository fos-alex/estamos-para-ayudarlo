angular.module('EPA.services')

    .factory(
        'Cercania', ['$rootScope','$cookies','superCercanos','Notificaciones','Map',
            function($rootScope,$cookies,superCercanos,Notificaciones,Map) {
                return {
                	run: function(){
                		var check = setInterval(function(){
                			if( !Map.getSucursal() && !($rootScope.cercaniaOlvidar == 'si') ){
	                			if(Notificaciones.statusCerca()){
	                				superCercanos.notificar_cercania();	
	                			}	
                			}	
                		},30000);
                		$rootScope.chkCercania = check;
                	}
                };
    }]);