angular.module('EPA.controllers')

.controller('AjustesCtrl', ['$scope','$ionicLoading', function($scope,$ionicLoading) {

      
            $scope.detectarVoz = function() {
              var maxMatches = 5;
              var language = "es-AR";
              $ionicLoading.show({
                template: 'Espere el tono y hable...'
              }); 
              window.plugins.speechrecognizer.start(resultCallback, errorCallback, maxMatches, language);
            };

            function resultCallback (result){
                $ionicLoading.hide();  
                console.log(result);
                alert(result.results[0][0].transcript);
            }

            function errorCallback(error){
                $ionicLoading.hide();  
                console.log(error);
            }

            $scope.reproducirVoz = function() {
                navigator.tts.startup(function(){
                    var language = "es-AR";
                    navigator.tts.setLanguage(language, function(){
                        navigator.tts.speak("Hola, que tal", function(){},function(){});
                    },function(error){alert("ERROR SETLANGUAGE "+error)});
                },function(error){alert("ERROR STARTUP "+error)});
            };
}])

.controller('GestorDeMapasCtrl', ['$scope', function($scope) {
    $scope.barrios = [
        "Villa Crespo",
        "Palermo",
        "New York"
    ]
}])

.controller('GestorDeNotificacionesCtrl', ['$scope','$ionicPopup','$state', 'Promociones',function($scope,$ionicPopup,$state, Promociones) {
    $scope.showAlert = function() {
        $scope.promociones=null;
        Promociones.get().then(

            function(response) {
                $scope.promociones = response;
                $ionicPopup.show({
                    templateUrl: 'templates/promociones.html',
                    scope: $scope,
                    title: 'Promociones',
                    buttons:[{
                        text: 'OK',
                        type: 'button-primary'
                    }]});
            });
    };
}]);
