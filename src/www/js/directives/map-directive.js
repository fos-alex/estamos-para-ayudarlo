angular.module('EPA.directives', [
])

.directive('canvasMap', function(){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var config = JSON.parse(attrs.config);
            angular.element(element).canvasMap({
                url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
                //url: "http://local.epa-web.com/app",
                url_mapa: '/mapas/' + config.idSucursal
            }, function () {
                $.fn.canvasMap.createRoute(config.categories);
            });
        }
    };
});