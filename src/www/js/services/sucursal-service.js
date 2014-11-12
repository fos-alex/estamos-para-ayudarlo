angular.module('EPA.services')

.factory(
		'Sucursal',['$http','CONFIG',
			function sucursalFactory($http, CONFIG) {
				return {
                    idSucursal: null,
					sucursalActual : function(latitud, longitud) {
						var posicion = {
							latitud : latitud,
							longitud : longitud
						};

						return $http.post(CONFIG.WS_URL
								+ "/app/sucursalactual", posicion);
					}
				};
			}
		]);
