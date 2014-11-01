angular.module('EPA.controllers')

.controller('AjustesCtrl', ['$scope','$ionicLoading','$state','ModoAudio','Texto', function($scope,$ionicLoading,$state,ModoAudio,Texto) {
    $scope.modoaudio = {enable: ModoAudio.status() };
    
    $scope.saveConfig = function(){
        if($scope.modoaudio.enable){
            ModoAudio.enable();
            Texto.reproducir('Modo de voz activado');   
        }else{
            ModoAudio.disable();
        }    
        $state.go('app.ajustes');
    };

}])

.controller('GestorDeMapasCtrl', ['$scope','buscarSucursales','Session', function($scope,buscarSucursales,Session) {

    Session.set('mapasDescargados', {});

    $scope.buscarSucursales = function () {
        buscarSucursales.obtener_sucursales(this.barrio).then(
            function (response) {
                $scope.sucursales = response.data.data;
            },
            function (error) {

            }
        );
    };

    $scope.descargarMapa = function () {
        buscarSucursales.obtener_mapa(this.item.id).then(
            function (response) {
                $scope.mapas = response.data.data;
                Session.set('mapasDescargados', $scope.mapas);
            },
            function (error) {

            }
        );
    };

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
