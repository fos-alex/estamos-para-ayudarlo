angular.module('EPA.controllers', ['EPA.services'])

    .controller('AppCtrl', ['$scope', function ($scope) {
    }])

    .controller('LoginCtrl', ['$scope', '$state', 'User', function ($scope, $state, User) {
        $scope.loginResponse = {
            message: "El usuario y password son requeridos",
            notifyShow: false,
            type: "info"
        };

        // @TODO: REMOVE HARDCODED BACKDOOR FOR DEVELOP
        if ($scope.user == '' && $scope.password == '') {
            $state.go('app.menu');
        }

        $scope.login = function () {
            User.login(this.user, this.password).then(function (response) {
                    $scope.loginResponse = response;
                    $scope.loginResponse.notifyShow = true;
                }
            );
        };
    }])


    .controller('MainMenuCtrl', ['$scope', function($scope) {
  $scope.menuItems = [
      {title: 'Scanner',         id: 1, href: "barcodescanner"  },
      {title: 'Map',             id: 2, href: "map" },
      {title: 'NFC Reader',      id: 3, href: "nfcreader" },
      {title: 'Geolocalization', id: 4, href: "geo" },
      {title: 'ABM Listas',      id: 5, href: "listas" }
  ];
}])

.controller('NFCReaderCtrl', ['$scope', function($scope) {
    alert('pido reader');

    nfc.addTagDiscoveredListener(function (result) {
        alert('resultado '+result);

    }, function (success) {
        alert('success '+success);


    }, function (error) {
        alert('error '+error);


    });
}])

.controller('ListasCtrl', ['$scope', '$stateParams', 'Lista', 'Session',
    function($scope, $stateParams, Lista, Session) {
        Session.set('createdList', {});
        Lista.get("", {refreshCache: true}).then(function(response) {
            $scope.listas = response;
        });
}])

.controller('ListaDetalleCtrl', ['$scope', '$state', '$stateParams', 'Lista', 'Session',
    function($scope, $state, $stateParams, Lista, Session) {
        Lista.get($stateParams.idLista, {}).then(function(response) {
            debugger;
            $scope.lista = response;
        });

        $scope.editList = function () {
            Session.set('createdList', $scope.lista);
            $state.go('app.nuevoItemLista');
        }

        $scope.deleteList = function () {
            Lista.delete($scope.lista).then(function() {
                $state.go('app.listas');
            });
        }
    }
])

.controller('NuevaListaCtrl', ['$scope', '$state', 'Session', 'Lista',
    function($scope, $state, Session, Lista) {
        $scope.createdList = Session.get('createdList') || {};
        $scope.createdList.nombre = $scope.createdList.nombre || "Nueva Lista";

        $scope.deleteItem = function (index) {
            $scope.createdList.productos.splice(index, 1);
            Session.set('createdList', this.createdList);
        }

        $scope.editTitle = function () {
            var text = jQuery(".title").text();
            var input = jQuery('<input class="titleInput" type="text" value="' + text + '" />');
            jQuery('.title').text('').append(input);
            input.select();

            input.blur(function() {
                var text = jQuery('.titleInput').val();
                jQuery('.titleInput').parent().text(text);
                jQuery('.titleInput').remove();
            });
        }

        $scope.deleteAllItems = function () {
            $scope.createdList = {};
            Session.set('createdList', this.createdList);
        }

        $scope.saveList = function () {
            Lista.save(this.createdList).then(function () {
                $scope.createdList = {};
                $state.go('app.listas');
            });

        }

        if (typeof $scope.createdList != "object" || $scope.createdList.length == 0) {
            // Lista nueva no creada. Redirecciono para que cargue items
            $state.go('app.nuevoItemLista');
        }
    }
])

.controller('NuevoItemListaCtrl', ['$scope', '$state', 'Producto', 'Session',
    function($scope, $state, Producto, Session) {
        $scope.createdList = Session.get('createdList') || {};

        $scope.acceptList = function () {
            this.createdList = angular.extend(this.createdList, {
                productos: []
            });

            angular.forEach(this.itemsDisponibles, function (value, key) {
                if (value.added) {
                    this.createdList.productos.push(value);
                }
            }, this);

            Session.set('createdList', this.createdList);
            $state.go('app.nuevaLista');
        }

        Producto.get("", {refreshCache: true}).then(function(response) {
            response = angular.extend(response, $scope.createdList.productos);
            $scope.itemsDisponibles = response;
        });
    }
])


.controller('GeolocalizationCtrl', ['$scope', function($scope) {
    alert('pido geo');
    navigator.geolocation.getCurrentPosition(function (success) {
        var position = success.coords;
        $scope.localization = 'Latitud: '+position.latitude+'. Longitud: '+position.longitude;
        $scope.$apply();
        alert('success '+success);

    }, function (error) {
        alert('error '+error);

    });
}])

.controller('BarcodeScannerCtrl', ['$scope', function($scope) {
    alert('pido scanner');

    var scanner = cordova.plugins.barcodeScanner;
    scanner.scan(
        function (result) {
            alert("Barcode dice:\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        }, function (error) {
            alert("Fallo el scanner: " + error);
        });
}])

.controller('MapCtrl', ['$scope', 'QRReader',
    function($scope, QRReader) {
        $scope.squares = [];

        $scope.activateCamera = function () {
            var read = QRReader.read();
            alert(read.text);

        }
}])


.directive('ngRaphaelSquare', function(){
        return {
            link: function(scope, element, attrs) {
                var r = Raphael(element[0]);
                var s = r.set();
                var squares = [
                    {type:"rect", x:0, y:0,   width:100, height:60, r:5 },
                    {type:"rect", x:100, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:0, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:100, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:200, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:400, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:500, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:600, y:490, width:100, height:60, r:5 },



                    {type:"rect", x:800, y:0,   width:100, height:60, r:5 },
                    {type:"rect", x:900, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:0, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:130, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:190, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:280, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:340, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:430, width:100, height:60, r:5 },
                    {type:"rect", x:800, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:900, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:1000, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:1200, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:1300, y:490, width:100, height:60, r:5 },
                    {type:"rect", x:1400, y:490, width:100, height:60}


                ];

                angular.forEach(squares, function (value, key){
                    this.s.push(
                        this.r.rect(value.x, value.y, value.width, value.height, value.r)
                    );
                }, {s: s, r: r});

                s.attr({fill: 'grey'});

                var c = r.circle(150,80,10,10,10);
                c.glow({color:'blue'});
                c.attr({fill:'blue'});
            }
        };
})
