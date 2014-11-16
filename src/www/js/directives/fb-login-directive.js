angular.module('EPA.directives')

/*appId : 1504374299806491
secret : 42d757114f3ae3d6dd4bd0b68fcf335a
*/

.directive('fbLogin', ['$window', '$state','User','$ionicLoading',function($window,$state,User,$ionicLoading){

    var getFacebookData = function(success,error){
        facebookConnectPlugin.api( "me/?scope=id,email", ["id,email"],success,error);
    };

    var checkRegister = function(){
        getFacebookData(function(userData){
            User.loginUserFacebook(userData.id).then(function(response){
                    $ionicLoading.hide();  
                    $state.go('app.menu');    
                },function(failure){
                    alert(JSON.stringify(userData));
                    User.registerUserFacebook(userData).then(function(response){
                        User.loginUserFacebook(userData.id).then(function(response){
                            $ionicLoading.hide();  
                            $state.go('app.menu');    
                        });
                    },function(error){
                        $ionicLoading.hide();            
                        alert("Hubo un error conectando a Facebook, intente nuevamente.");
                        console.log("ERROR REGISTER FB USER "+ JSON.stringify(error));
                    });
                }
            );
        },function(response){
            $ionicLoading.hide();  
            facebookConnectPlugin.logout();
            alert("Hubo un error conectando a Facebook, intente nuevamente.");
            console.log("DATA ERROR "+JSON.stringify(response));
        });
    };

    return {
        restrict: 'A',
        link: function(scope, element, attrs) { 
          element.find("a").on('click',function(){
            $ionicLoading.show({
                template: 'Conectando a Facebook...'
            });  
            if (!window.cordova) {
                var appId = 1504374299806491;
                facebookConnectPlugin.browserInit(appId);
            }
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response && response.status == 'connected'){
                        checkRegister();
                }else{
                  facebookConnectPlugin.login(
                    ["public_profile","email"], function(response){
                        checkRegister();
                    },function(failure){
                        $ionicLoading.hide();  
                        alert("Debes autorizar la aplicacion para acceder.");
                    });
                }
            }, function(failure){
              $ionicLoading.hide();  
              alert("Hubo un error conectando a Facebook, intente nuevamente.");
            });
              
          });

        }
    }
}]);