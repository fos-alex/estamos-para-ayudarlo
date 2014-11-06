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
            angular.element(element).canvasMap({
                url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
                //url: "http://local.epa-web.com/app",
                url_mapa: '/mapas/' + scope.config.idSucursal
            }, function () {
                scope.$watch("refresh",function(newValue, oldValue) {
                    if (newValue) {
                        $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                        scope.refresh = false;
                    }
                });
                $.fn.canvasMap.createRoute(scope.config.categories, scope.config.position);
                scope.refresh = false;
            });
        }
    };
});