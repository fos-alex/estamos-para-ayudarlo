angular.module('EPA.services')
    .factory('NFCReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session', 'TagMapping',
            function nfcReaderFactory ($rootScope, $q, $timeout, CONFIG, Session, TagMapping)
            {
                var init = function () {
                    Session.set('NFCReads', []);
                };
                var nfcScanFunction = null;

                init();
                if (typeof cordova !== 'undefined') {
                    var scannerNFC = nfc;
                    nfcScanFunction =  function (cb) {
                        scannerNFC.addNdefListener(
                            function (nfcEvent) {
                                var tag = nfcEvent.tag;
                                var payload = tag.ndefMessage[0]["payload"];
                                var stringValue = nfc.bytesToString(payload).substr(3);
                                var response = TagMapping.mapObjectKeys(JSON.parse(stringValue));
                                return cb(null, response);
                            },
                            function () {
                                alert("Acerque el tag NFC.");
                            },
                            function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                                cb(error);
                            });
                    }
                } else {
                    nfcScanFunction = function(cb) {
                        var response = {"codigo":0,"mensaje":"Operacion Satisfactoria","text":""};
                        //response.text = JSON.stringify({"id":"1","nombre":"Coca","descripcion":"Gaseosa de primera linea!","precio":"20","imagen":"./img/coke.jpg","info":"http://www.coca-cola.com.ar/"});
                        cb(null, TagMapping.mapObjectKeys({id:100,idg:63,n:"DULCE DE LECHE COTO",d:"Dulce de leche de primera calidad",p:18.07,c:"Lacteos",i:"./img/ddl.jpg"}));
                    }
                }

                return {
                    read: nfcScanFunction
                };
            }])
;