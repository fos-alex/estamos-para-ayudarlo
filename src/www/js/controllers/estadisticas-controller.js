angular.module('EPA.controllers')

    .controller('estadisticaCtrl', ['$scope','$state','$ionicLoading','estadisticas',
        function($scope, $state,$ionicLoading,estadisticas) {
            $scope.mes_estadistica = "09";
            $scope.mostrarTotal=false;
            $scope.mostrarDetalle=false;

            $scope.getMes = function(){
                $ionicLoading.show({
                    template: 'Consultando datos...'
                });  
                estadisticas.getMes(this.mes_estadistica).then(
                    function(response){
                        $scope.mostrarDetalle=true;
                        $scope.mostrarTotal=false;
                        $scope.estadisticas = response.data.data;
                        $ionicLoading.hide();
                    },
                    function(error){
                        $ionicLoading.hide();
                    }
                );

            };
            
            $scope.getTotal = function(){
                $ionicLoading.show({
                    template: 'Consultando datos...'
                });  
                estadisticas.getTotal(this.mes_estadistica).then(
                     function(response){
                         $scope.mostrarTotal=true;
                         $scope.mostrarDetalle=false;
                         $scope.info= 'La cantidad de compras realizadas fue de: '+ response.data.data.cantidad_compras
                         $scope.info_2= 'El total consumido fue de: $ '+ parseInt(response.data.data.total_por_mes);
                         $ionicLoading.hide();
                     },
                     function(error){
                        $ionicLoading.hide();
                     }
                );

            };

        }])
