angular.module('EPA.controllers')

.controller('AjustesCtrl', ['$scope','$ionicLoading','$state','ModoAudio','Texto', function($scope,$ionicLoading,$state,ModoAudio,Texto) {
    $scope.modoaudio = {enable: ModoAudio.status() };
    
    $scope.saveConfig = function(){
        if($scope.modoaudio.enable){
            ModoAudio.enable();
            Texto.reproducir('Modo de voz activado');   
        }else{
            ModoAudio.disable();
        }    
        $state.go('app.ajustes');
    };

}])

.controller('GestorDeMapasCtrl', ['$scope','buscarSucursales','Session', function($scope,buscarSucursales,Session) {

    Session.set('mapasDescargados', {});

    $scope.buscarSucursales = function () {
        buscarSucursales.obtener_sucursales(this.barrio).then(
            function (response) {
                $scope.sucursales = response.data.data;
            }
        );
    };

    $scope.descargarMapa = function () {
        buscarSucursales.obtener_mapa(this.item.id).then(
            function (response) {
                $scope.mapas = response.data.data;
                Session.set('mapasDescargados', $scope.mapas);
            }
        );
    };

}])

.controller('GestorDeNotificacionesCtrl', ['$scope','$ionicPopup','$state', 'Promociones','Notificaciones','superCercanos',function($scope,$ionicPopup,$state, Promociones, Notificaciones,superCercanos) {
    $scope.notificacion_promo = {enable: Notificaciones.statusPromos() };
    $scope.notificacion_cerca = {enable: Notificaciones.statusCerca() };

    $scope.saveConfig = function(){
        if($scope.notificacion_promo.enable){
            Notificaciones.enablePromos();
        }else{
            Notificaciones.disablePromos();
        }    
        if($scope.notificacion_cerca.enable){
            Notificaciones.enableCerca();
        }else{
            Notificaciones.disableCerca();
        }    
        $state.go('app.ajustes');
    };

    $scope.showAlert = function() {
        $scope.promociones=null;
        Promociones.get().then(

            function(response) {
                $scope.promociones = response;
                $ionicPopup.show({
                    templateUrl: 'templates/promociones.html',
                    scope: $scope,
                    title: 'Promociones',
                    buttons:[{
                        text: 'OK',
                        type: 'button-primary'
                    }]});
            });
    },    
    
    
    $scope.superCercanos2 = function() {
		navigator.geolocation.getCurrentPosition(function(success) {
			var position = success.coords;
			$scope.latitud = position.latitude;
			$scope.longitud = position.longitude;
			$scope.superCercanos();
			$scope.$apply();

		}, function(error) {
			alert('error ' + error);

		});
		
		$scope.superCercanos = function() {
			$scope.supermercados= null;
			
			superCercanos.notificar_cercania(this.latitud,
					this.longitud).then(

	            function(response) {
	            	$scope.supermercados=response.data.data;
	                $ionicPopup.show({
	                    templateUrl: 'templates/geolocalization.html',
	                    scope: $scope,
	                    title: 'Supermercados Cercanos',
	                    buttons:[{
	                        text: 'OK',
	                        type: 'button-primary'
	                    }]});
	            });
	    };
		
	};
    
}]);
