angular.module('EPA.directives', [
])

.directive('canvasMap', function(){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            debugger;
            angular.element(element).canvasMap({
                url: "http://local.epa-web.com/app",
                url_mapa: '/mapas/' + '1'
            });
        }
    };
});