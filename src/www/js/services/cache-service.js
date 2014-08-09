angular.module('EPA.services')

    .factory('Cache',
        ['CONFIG',
            function cacheFactory (CONFIG)
            {
                var init = function() {
                }

                init();

                return {
                    set: function (key, element) {
                        if (typeof element != "string") {
                            element = JSON.stringify(element);
                        }
                        window.localStorage.setItem(key, element);
                        return element;
                    },
                    get: function (key) {
                        var element = window.localStorage.getItem(key);
                        if (typeof element == "string") {
                            element = JSON.parse(element);
                        }
                        return element;
                    }
                }
            }]);