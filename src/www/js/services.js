angular.module('EPA.services', [])

.config(['$httpProvider', function($httpProvider) {
        // Allow cross site requests
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
}])

.factory('User',
        ['$http' ,'$state', '$rootScope', '$q', '$timeout',
function userFactory ($http, $state, $rootScope, $q, $timeout)
{
    var currentUser,
        isLoggedIn = false,
        permissions;

    return {
        login: function (user, password) {
            isLoggedIn = true;
            var params = {
                username: user,
                password: password
            };
            var deferred = $q.defer();
            // @TODO: Aislar la constante en un servicio de constantes o algo así
            $http.post("http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app/login", params)
                 .success(function (result, status, headers){
                    var response = {code: status};
                    response.message = "Login satisfactorio";
                    $state.go('app.menu');
                    $timeout(function(){
                        deferred.resolve(response);
                    });
                 })
                .error(function (result, status, headers) {
                    var response = {code: status};
                    if (status == 403) {  // Login Failed
                        response.message = "Usuario o password incorrectos";
                    } else {   // Server Error
                        response.message = "Ocurrió un error inesperado";
                    }
                    $timeout(function(){
                        deferred.resolve(response);
                    });
                });
            return deferred.promise;
        },
        logout: function () {
            isLoggedIn = false;
            $state.go('app.login');
        },
        isLoggedIn: function () {
            return isLoggedIn;
        },
        currentUser: function () {
            return currentUser;
        },
        isAllowedToDo: function () {

        }
    };
}]);