angular.module('EPA.services', ['EPA.config', 'ngResource'])

.config(['$httpProvider', function($httpProvider) {
        // Allow cross site requests
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
}]);