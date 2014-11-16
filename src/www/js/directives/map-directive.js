angular.module('EPA.directives', [
])

.directive('canvasMap', ['$ionicLoading', function($ionicLoading) {
    return {
        restrict: 'E',
        scope :{
            config: '=',
            refresh: '='
        },
        link: function(scope, element, attrs) {
            var configActual = {};
            var cambioConfig = function (config) {
                if (config.position !== configActual.position) {
                    return true;
                }
                if (!config.categories || !configActual.categories) {
                    return true;
                }
                if (config.categories.toString() !== configActual.categories.toString()) {
                    return true;
                }
                return false;
            };

            var cambioSucursal = function (config) {
                if (config.idSucursal !== configActual.idSucursal) {
                    return true;
                }
                return false;
            };

            angular.element(element).canvasMap({
                url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
                //url: "http://local.epa-web.com/app",
                url_mapa: '/mapas/' + scope.config.idSucursal
            }, function () {
                scope.$watch("refresh",function(newValue) {
                    if (cambioSucursal(scope.config)) {
                        $.fn.canvasMap.cambiarSucursal({url_mapa: '/mapas/' + scope.config.idSucursal});
                    }
                    if (newValue && cambioConfig(scope.config)) {
                        configActual = $.extend(true, {}, scope.config);
                        $ionicLoading.show({template: 'Procesando rutas'});
                        $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                        $ionicLoading.hide();
                        scope.refresh = false;
                    }
                });
                if (cambioConfig(scope.config)) {
                    configActual = $.extend(true, {}, scope.config);
                    $ionicLoading.show({template: 'Procesando rutas'});
                    $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                    $ionicLoading.hide();
                    scope.refresh = false;
                }
            });
        }
    };
}]);