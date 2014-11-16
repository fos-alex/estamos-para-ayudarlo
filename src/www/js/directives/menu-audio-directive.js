angular.module('EPA.directives')

.directive('menuAudio', ['$rootScope','$injector','ModoAudio',function($rootScope,$injector,ModoAudio){

	return {
        restrict: 'A',
        link: function(scope, element, attrs){ 
            var AudioService = $injector.get(attrs.menuAudio);
            if(ModoAudio.status()){
                AudioService.init(scope,element);
                AudioService.run();
            }
        }
    };

}]);
