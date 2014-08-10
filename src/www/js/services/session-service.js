angular.module('EPA.services')

.factory('Session',
    ['CONFIG', 'Cache',
        function sessionFactory (CONFIG, Cache)
        {
            var init = function() {
            }

            init();

            return {
                set: function (key, element) {
                    return Cache.set('SESSION_'+key, element);
                },
                get: function (key) {
                    return Cache.get('SESSION_'+key);
                }
            }
        }]);