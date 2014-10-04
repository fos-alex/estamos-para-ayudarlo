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
                            currentUser = {username:params.username};
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
                    $http.post(CONFIG.WS_URL+"/app/logout", '')
                    .success(function (result, status, headers){
                    	isLoggedIn = false;    
                        $state.go('app.login');
                   });
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

                },
                loginUserFacebook: function(userID){
                    var deferred = $q.defer();

                    $http.get(CONFIG.WS_URL+"/app/fbusuario/"+userID,{})
                        .success(function (result, status, headers){
                            deferred.resolve(result);
                        })
                        .error(function (result, status, headers) {
                            deferred.reject(result); 
                        });
                    return deferred.promise;
                },
                registerUserFacebook: function(userdata){
                    var deferred = $q.defer();

                    $http.post(CONFIG.WS_URL+"/app/fbusuario/",userdata)
                        .success(function (result, status, headers){
                            deferred.resolve(result);
                        })
                        .error(function (result, status, headers) {
                            deferred.reject(result);  
                        });
                    return deferred.promise;
                }
            };
        }])
