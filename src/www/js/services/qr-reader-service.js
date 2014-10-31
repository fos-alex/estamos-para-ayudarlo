angular.module('EPA.services')
    .factory('QRReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session',
            function qrReaderFactory ($rootScope, $q, $timeout, CONFIG, Session)
            {
                var init = function () {
                    Session.set('QRReads', []);
                };

                init();
                if (typeof cordova !== 'undefined') {
                    var scanner = cordova.plugins.barcodeScanner;
                } else {
                    var scanner = {
                        scan: function(cb) {
                            var response = {"codigo":0,"mensaje":"Operacion Satisfactoria","text":""};
                            //response.text = JSON.stringify({"id":"1","nombre":"Coca","descripcion":"Gaseosa de primera linea!","precio":"20","imagen":"./img/coke.jpg","info":"http://www.coca-cola.com.ar/"});
                            response.text = JSON.stringify({"id":100,"id_generico":63,"nombre":"DULCE DE LECHE COTO","descripcion":"Dulce de leche de primera calidad","precio":18.07,"categoria":"Lacteos","imagen":"./img/ddl.jpg","info":"http://www.coto.com.ar/"});
                            cb(response);
                        }
                    }
                }

                return {
                    read: function (cb) {
                        scanner.scan(
                            function (result) {
                                return cb(null, JSON.parse(result.text));
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                                cb(error);
                            });
                    }
                };
            }])
;