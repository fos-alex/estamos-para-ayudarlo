angular.module('EPA.services')
    .factory('QRReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session',
            function qrReaderFactory ($rootScope, $q, $timeout, CONFIG, Session)
            {
                var init = function () {
                    Session.set('QRReads', []);
                }

                init();
                if (typeof cordova !== 'undefined') {
                    var scanner = cordova.plugins.barcodeScanner;
                } else {
                    var scanner = {
                        scan: function(cb) {
                            var response = {"codigo":0,"mensaje":"Operacion Satisfactoria","data":[{"id":"1","nombre":"Coca","descripcion":"Gaseosa de primera linea","precio":"20","imagen":"./img/coke.jpg","info":"http://www.coca-cola.com.ar/"}]};
                            cb(response);
                        }
                    }
                }

                return {
                    read: function (cb) {
                        scanner.scan(
                            function (result) {
                                var reads = Session.get('QRReads');
                                angular.forEach(result.data, function (read) {
                                    reads.push(read);
                                });
                                return cb({}, JSON.parse(Session.set('QRReads', reads)));
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                                cb(error);
                            });
                    }
                };
            }])
;