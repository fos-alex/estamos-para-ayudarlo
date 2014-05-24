angular.module('EPA.services', [])

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/**']);
}])

.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}])


.factory('User',
        ['$http' ,'$state',
function userFactory ($http, $state)
{
    var currentUser,
        isLoggedIn = false,
        permissions;

    return {
        login: function (user, password) {
            isLoggedIn = true;
            var params = {
                password: password,
                username: user
            };
            // @TODO: Aislar la constante en un servicio de constantes o algo así
            $http.post("http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app/login", params, {"Content-Length":31})
                 .success(function (result, status, headers){
                    // @TODO: Mostrar mensaje de login satisfactorio
                    $state.go('app.menu');
                 })
                .error(function (result, status, headers) {
                    if (status == 404) {
                        // Login Failed
                        // @TODO: Mostrar mensaje de login erroneo
//                        alert('login incorrecto');
                    } else {
                        // Server Error
                        // @TODO: Mostrar mensaje de error inesperado
  //                      alert('error de server');
                    }
                });
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