angular.module('EPA.services')
    .factory('QRReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session', 'TagMapping',
            function qrReaderFactory ($rootScope, $q, $timeout, CONFIG, Session, TagMapping)
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
                            //response.text = JSON.stringify({"id":83,"idg":49,"s":4,"n":"AGUA SIN GAS","d":"AGUA SIN GAS Bon Aqua 1,5l","p":7,"c":"Bebidas","i":"./img/ab.jpg"});
                            //response.text = JSON.stringify({s:[4,10][Math.floor(Math.random() * [4,10].length)]});
                            response.text = JSON.stringify({id:100,idg:63,s:4,n:"DULCE DE LECHE COTO",d:"Dulce de leche de primera calidad",p:18.07,c:"Lacteos",i:"./img/ddl.jpg"});
                            //response.text = JSON.stringify({"id":10010,"idg":79,"s":6,"n":"JABON EN POLVO","d":"JABON EN POLVO ZORRO Baja Espuma","p":12.15,"c":"Limpieza","i":"./img/jpz.jpg"});

                            cb(response);
                        }
                    }
                }

                return {
                    read: function (cb) {
                        scanner.scan(
                            function (result) {
                                var response = TagMapping.mapObjectKeys(JSON.parse(result.text));
                                return cb(null, response);
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                                cb(error);
                            });
                    }
                };
            }])
;