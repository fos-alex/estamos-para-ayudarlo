angular.module('EPA.controllers')

.controller('CompartirCtrl', ['$scope', '$state', '$stateParams', 'User', 'Lista', function($scope, $state, $stateParams, User, Lista) {            
        Lista.get($stateParams.idLista, {}).then(function(response){
            $scope.lista = response;
            }
        );
        
        $scope.compartirResponse = {
            message: "",
            notifyShow: false,
            type: "info"
        };

        //$scope.emailcompartir = null;
        $scope.compartir = function() {            
            Lista.compartir($stateParams.idLista, this.emailcompartir).then(function(response){
                    $scope.compartirResponse.message = response.data.mensaje;
                    $scope.compartirResponse.notifyShow = true; 
                    if (response.data.codigo ==0) {
                        setTimeout(function(){
                            $state.go ("app.listas");
                            },2000);
                        $scope.compartirResponse.type = 'success';
                    }else {
                        $scope.compartirResponse.type = 'error';
                    }

                }

            );
        };       
}])
