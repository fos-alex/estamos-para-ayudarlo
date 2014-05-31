var configModule = angular.module('EPA.config', []);
var configData = {
    'CONFIG': {
        'APP_NAME': 'EPA',
        'APP_VERSION': '0.1',
        'WS_URL': 'http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com'
    }
}

angular.forEach(configData,
    function(key,value) {
        configModule.constant(value,key);
    }
);