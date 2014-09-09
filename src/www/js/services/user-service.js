angular.module('EPA.services')

.factory('User',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', 'CONFIG',
        function userFactory ($http, $state, $rootScope, $q, $timeout, CONFIG)
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

                    $http.post(CONFIG.WS_URL+"/app/login", params)
                        .success(function (result, status, headers){
                            var response = {
                                code: status,
                                type: "success"
                            };
                            response.message = "Login satisfactorio";
                            $state.go('app.menu');
                            $timeout(function(){
                                deferred.resolve(response);
                            });
                       })
                        .error(function (result, status, headers) {
                            var response = {
                                code: status,
                                type: "error"
                            };
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
                registrar: function (userdata) {

                    var deferred = $q.defer();

                    $http.post(CONFIG.WS_URL+"/app/registrar", userdata)
                        .success(function (result, status, headers){
                            var response = {
                                code: status,
                                type: "success"
                            };
                            //response.message = "Usuario creado correctamente";
                            //$state.go('app.login');


                            $timeout(function(){
                                deferred.resolve(response);
                            });

                            if (result['codigo'] == 0) {
                                    $state.go ('app.login');
                            } else {
                                response.message = result['mensaje'];
                            }
                        })
                        .error(function (result, status, headers) {
                            var response = {
                                code: status,
                                type: "error"
                            };
/*                            if (status == 403) {  // Login Failed
                                response.message = "Usuario o password incorrectos";
                            } else {   // Server Error
                                response.message = "Ocurrió un error inesperado";
                            }*/
                            $timeout(function(){
                                deferred.resolve(response);
                            });
                        });
                    return deferred.promise;
                },
                recuperoClave: function (userdata) {

                    var deferred = $q.defer();

                    $http.post(CONFIG.WS_URL+"/app/recuperopassword", userdata)
                        .success(function (result, status, headers){
                            var response = {
                                code: status,
                                type: "success"
                            };
                            $timeout(function(){
                                deferred.resolve(response);
                            });

                            if (result['codigo'] == 0) {
                                $state.go ('app.login');
                            } else {
                                response.message = result['mensaje'];
                            }
                        })
                        .error(function (result, status, headers) {
                            var response = {
                                code: status,
                                type: "error"
                            };
/*
                            if (status == 403) {  // Login Failed
                                response.message = "Usuario o password incorrectos";
                            } else {   // Server Error
                                response.message = "Ocurrió un error inesperado";
                            }
*/
                            $timeout(function(){
                                deferred.resolve(response);
                            });
                        });
                    return deferred.promise;
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
        }])
