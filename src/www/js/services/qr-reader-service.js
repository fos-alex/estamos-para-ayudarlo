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
                }

                return {
                    read: function (cb) {
                        scanner.scan(
                            function (result) {
                                var reads = Session.get('QRReads');
                                reads.push(result);
                                alert(result);
                                return cb({}, Session.set('QRReads', reads));
                            }, function (error) {
                                //@TODO: Throw error
                                alert("Fallo el scanner: " + error);
                                cb(error);
                            });
                    }
                };
            }])
;