angular.module('EPA.controllers')

.controller('RegistrarCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
//        $scope.loginResponse = {
//            message: "El usuario y password son requeridos",
//            notifyShow: false,
//            type: "info"
//        };

        $scope.user = {
            data:{}
        };

        $scope.registrar = function() {
            User.registrar($scope.user.data).then(function(response){

                    $scope.registrarResponse = response;
                    $scope.registrarResponse.notifyShow = true;
//                    if (response.code ==0) {
//                        $state.go ("app.login");
//                    }
                    if (response.codigo ==0) {
                        setTimeout(function(){
                            $state.go ("app.login");
                        },2000);
                        $scope.registrarResponse.type = 'success';
                    }else {
                        $scope.registrarResponse.type = 'error';
                    }


                }

            );
        };
}]);
