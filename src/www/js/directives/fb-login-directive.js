angular.module('EPA.directives', [
])

/*appId : 1504374299806491
secret : 42d757114f3ae3d6dd4bd0b68fcf335a
*/

.directive('fbLogin', ['$window', '$state','User',function($window,$state,User){

    var getFacebookData = function(success,error){
        facebookConnectPlugin.api( "me/?scope=email", ["email"],success,error);
    };

    var checkRegister = function(){
        getFacebookData(function(userData){
            User.loginUserFacebook(userData.id).then(function(response){
                    $state.go('app.menu');    
                },function(failure){
                    User.registerUserFacebook(userData).then(function(response){
                        User.loginUserFacebook(userData.id).then(function(response){
                            $state.go('app.menu');    
                        });
                    },function(error){
                        console.log("ERROR REGISTER FB USER "+ JSON.stringify(error));
                    });
                }
            );
        },function(response){
            console.log("DATA ERROR "+JSON.stringify(response));
        });
    };

    return {
        restrict: 'A',
        link: function(scope, element, attrs) { 
            if (!window.cordova) {
                var appId = 1504374299806491;
                facebookConnectPlugin.browserInit(appId);
            }

          element.find("a").on('click',function(){
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response.status == 'connected'){
                        checkRegister();
                }else{
                  facebookConnectPlugin.login(
                    ["public_profile","email"], function(response){
                        checkRegister();
                    },function(failure){
                        alert("Debes autorizar la aplicacion para acceder.");
                    });
                }
            }, function(failure){
              alert("Hubo un error conectando a Facebook, intente nuevamente.");
            });
              
          });

        }
    }
}]);