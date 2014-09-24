angular.module('EPA.directives', [
])

/*appId : 1504374299806491
secret : 42d757114f3ae3d6dd4bd0b68fcf335a
*/

.directive('fbLogin', ['$window',function($window){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) { 
          element.find("a").on('click',function(){
              FB.login(function(response) {
                 if (response.authResponse) {
                   console.log('Usuario logueado');
                   FB.api('/me', function(response) {
                     console.log('Nombre : ' + response.name );
                   });
                 } else {
                   console.log('User cancelled login or did not fully authorize.');
                 }
              });
          });

          window.fbAsyncInit = function() {
            FB.init({
              appId      : '1504374299806491',
              xfbml      : true,
              version    : 'v2.0'
            });
          };

          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "http://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));

        }
    }
}]);