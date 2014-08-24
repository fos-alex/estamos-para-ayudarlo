angular.module('EPA.controllers')

.controller('CompartirCtrl', ['$scope', '$state', '$stateParams', 'User', 'Lista', function($scope, $state, $stateParams, User, Lista) {
        $scope.compartirResponse = {
            message: "",
            notifyShow: false,
            type: "info"
        };

        //$scope.emailcompartir = null;
        $scope.compartir = function() {
            debugger;
            Lista.compartir($stateParams.idLista, $scope.emailcompartir).then(function(response){

                    $scope.compartirResponse = response;
                    $scope.compartirResponse.notifyShow = true;
                    if (response.code ==0) {
                        $state.go ("app.listas");
                    }

                }

            );
        };
}])
