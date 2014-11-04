angular.module('EPA.directives')

.directive('mostrarPromociones', 
	['$rootScope','$ionicPopup','Notificaciones','Promociones',function($rootScope,$ionicPopup,Notificaciones,Promociones){

	return {
        restrict: 'A',
        link: function(scope, element, attrs){ 
        	if(Notificaciones.status_promos()){
	        	Promociones.get().then(function(response) {
	                scope.promociones = response;
	                $ionicPopup.show({
	                    templateUrl: 'templates/promociones.html',
	                    scope: scope,
	                    title: 'Promociones',
	                    buttons:[{
	                        text: 'OK',
	                        type: 'button-primary'
	                    }]});
	            });	
        	}
        }
    };

}]);
