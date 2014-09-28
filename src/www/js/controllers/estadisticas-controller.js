angular.module('EPA.controllers')

    .controller('estadisticaCtrl', ['$scope','$state','estadisticas',
        function($scope, $state,estadisticas) {
            $scope.mes_estadistica = "05";
            $scope.mostrarTotal=false;
            $scope.mostrarDetalle=false;

            $scope.getMes = function(){
                estadisticas.getMes(this.mes_estadistica).then(
                    function(response){
                        $scope.mostrarDetalle=true;
                    },
                    function(error){

                    }
                );
            };
                $scope.getTotal = function(){
                estadisticas.getTotal(this.mes_estadistica).then(
                     function(response){
                         $scope.mostrarTotal=true;
                         $scope.info= 'La cantidad de compras realizadas fue de: '+ response.data.data.cantidad_compras
                         $scope.info_2= 'El total consumido fue de: $ '+ parseInt(response.data.data.total_por_mes);
                     },
                     function(error){
                     }
                );

            };

        }])
