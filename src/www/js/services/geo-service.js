angular.module('EPA.services')

.factory(
		'superCercanos',['$http','$ionicPopup','$ionicLoading','$cookies','$state','$rootScope','CONFIG','Map',
			function superCercanosFactory($http,$ionicPopup,$ionicLoading,$cookies,$state,$rootScope,CONFIG,Map) {
				return {
						buscar_sucursales : function(latitud, longitud, distancia) {

							var posicion = {
								latitud : latitud,
								longitud : longitud
							};
							if(distancia) posicion.distancia = distancia;
							return $http.post(CONFIG.WS_URL
									+ "/app/promociones", posicion);
						},
						notificar_cercania : function(){
							var that = this;
							if(!$rootScope.searchingGPS){
								$rootScope.searchingGPS = true;
								navigator.geolocation.getCurrentPosition(function(success) {
									$rootScope.searchingGPS = false;
									var position = success.coords;
									that.buscar_sucursales(position.latitude,position.longitude,100).
										then(function(response){
											var supermercados=response.data.data;
											if(supermercados && supermercados.length){
												var supermercado = supermercados[0];
												var confirmPopup = $ionicPopup.confirm({
												     title: 'Notificacion de Cercania',
												     template: 'Usted esta en el supermercado '+supermercado.super+ ' (' +supermercado.sucursal+') ¿Quiere realizar una compra?'
												   });
												   confirmPopup.then(function(res) {
												     if(res) {
												       Map.setSucursal(supermercado.id);
												       $ionicLoading.show({
												            template: 'Cargando mapa...'
												       });  
												       setTimeout(function(){
								                            $ionicLoading.hide();  
												       },3000);
												       $state.go('app.map');
												     } else {
												       $rootScope.cercaniaOlvidar = 'si';
												     }
												   });
											}
										});
								//GPS ERROR
								},function(){
									$rootScope.searchingGPS = false;
								});
							}
						//function notificar	
						}
				};
			}
		]);
