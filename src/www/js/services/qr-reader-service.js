angular.module('EPA.services')
    .factory('QRReader',
        ['$rootScope', '$q', '$timeout', 'CONFIG', 'Session',
            function qrReaderFactory ($rootScope, $q, $timeout, CONFIG, Session)
            {
                var init = function () {
                    Session.set('QRReads', []);
                }

                init();

                return {
                    read: function () {
                        var scanner = cordova.plugins.barcodeScanner;
                        scanner.scan(
                            function (result) {
                                var reads = Session.get('QRReads');
                                reads.push(result);
                                return Session.set('QRReads', reads);
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                            });
                    }
                };
            }])
;