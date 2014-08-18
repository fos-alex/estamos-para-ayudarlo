angular.module('EPA.controllers')

.controller('RegistrarCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
        $scope.loginResponse = {
            message: "El usuario y password son requeridos",
            notifyShow: false,
            type: "info"
        };

        $scope.user = {
            data:{}
        };

        $scope.registrar = function() {
            User.registrar($scope.user.data).then(function(response){

                    $scope.loginResponse = response;
                    $scope.loginResponse.notifyShow = true;
                    if (response.code ==0) {
                        $state.go ("app.menu");
                    }

                }

            );
        };
}])
