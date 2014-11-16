angular.module('EPA.controllers')

.controller(
		'GeolocalizationCtrl',
		[
				'$scope',
				'superCercanos','$ionicPopup',
				function($scope, superCercanos,$ionicPopup) {
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
					
				} ]);