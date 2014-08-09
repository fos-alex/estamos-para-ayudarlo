angular.module('EPA.controllers')

.controller('ListasCtrl', ['$scope', '$stateParams', 'Lista', 'Session',
    function($scope, $stateParams, Lista, Session) {
        Session.set('createdList', {});
        Lista.get("", {refreshCache: true}).then(function(response) {
            $scope.listas = response;
        });
}])