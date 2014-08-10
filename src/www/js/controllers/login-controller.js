angular.module('EPA.controllers')

.controller('LoginCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
        $scope.loginResponse = {
            message: "El usuario y password son requeridos",
            notifyShow: false,
            type: "info"
        };

        // @TODO: REMOVE HARDCODED BACKDOOR FOR DEVELOP
        if ($scope.user == '' && $scope.password == '') {
            $state.go('app.menu');
        }

        $scope.login = function() {
            User.login(this.user, this.password).then(function(response){
                    $scope.loginResponse = response;
                    $scope.loginResponse.notifyShow = true;
                }
            );
        };
}])
