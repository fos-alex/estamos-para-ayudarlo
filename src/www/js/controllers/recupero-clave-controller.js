angular.module('EPA.controllers')

    .controller('recupero-claveCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
        $scope.user = {
            data:{}
        };

        $scope.recuperoClave = function() {
            User.recuperoClave($scope.user.data).then(function(response){

                    $scope.recuperoClaveResponse = response;
                    $scope.recuperoClaveResponse.notifyShow = true;
                    if (response.codigo ==0) {
                        $state.go ("app.login");
                        $scope.recuperoClaveResponse.type = 'success';
                    }else {
                        $scope.recuperoClaveResponse.type = 'error';
                    }


                }

            );
        };
    }]);