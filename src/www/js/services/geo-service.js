angular.module('EPA.services')

.factory(
		'superCercanos',['$http','CONFIG',
			function superCercanosFactory($http, CONFIG) {
				return {
					notificar_cercania : function(latitud, longitud) {
						var posicion = {
							latitud : latitud,
							longitud : longitud
						};

						return $http.post(CONFIG.WS_URL
								+ "/app/promociones", posicion);
					}
				};
			}
		]);
