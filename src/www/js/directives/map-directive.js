angular.module('EPA.directives', [
])

.directive('canvasMap', function(){
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

            angular.element(element).canvasMap({
                url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
                //url: "http://local.epa-web.com/app",
                url_mapa: '/mapas/' + scope.config.idSucursal
            }, function () {
                scope.$watch("refresh",function(newValue, oldValue) {
                    if (newValue && cambioConfig(scope.config)) {
                        configActual = $.extend(true, {}, scope.config);
                        $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                        scope.refresh = false;
                    }
                });
                if (cambioConfig(scope.config)) {
                    configActual = $.extend(true, {}, scope.config);
                    $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                    scope.refresh = false;
                }
            });
        }
    };
});