angular.module('EPA.controllers')

.controller(
		'GeolocalizationCtrl',['$scope','superCercanos',
			function($scope, superCercanos) {
				navigator.geolocation.getCurrentPosition(function(success) {
					var position = success.coords;
					$scope.latitud = position.latitude;
					$scope.longitud = position.longitude;
					$scope.$apply();

				}, function(error) {
					alert('error ' + error);

			});
				$scope.superCercanos = function() {
					superCercanos.notificar_cercania(this.latitud,
							this.longitud).then(function(response) {
						$scope.mostrarDetalle = true;
					}, function(error) {
					});
				};
			}]);