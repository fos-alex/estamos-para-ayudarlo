angular.module('EPA.services')
.factory('Resource',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', 'CONFIG', 'Cache',
        function resourceFactory ($http, $state, $rootScope, $q, $timeout, $resource, CONFIG, Cache)
        {
            var urlDefault = CONFIG.WS_URL;

            return {
                init: function(key) {
                    Cache.set(key, {});
                },
                get : function (id, key, options) {
                    var defaultOptions = {
                        refreshCache : false,
                        url :          urlDefault+"/app/"+key
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var result = false,
                        resource = false;

                    if (id != 'undefined' && !options.refreshCache) {
                        var resource = Cache.get(key);
                        if (typeof resource[id] != 'undefined') {
                            deferred.resolve(resource[id]);
                            result = true;
                        }
                    }
                    if (!result) {
                        var res = this.resource(id? '/' + id : '', null, options);
                        res.get(function (response) {
                            if (response.codigo != 0) {
                                //@TODO: throw exception
                                deferred.reject(response);
                            }
                            deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                            for (var id in response.data) {
                                if (!resource) {
                                    resource = Cache.get(key);
                                }
                                resource[response.data[id].id] = response.data[id];
                            }
                            Cache.set(key, resource);
                        });
                    }
                    return deferred.promise;
                },
                insert: function (object, cacheKey, options) {
                    var defaultOptions = {
                        url :          urlDefault+"/app/"+cacheKey
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/', object.id, options);

                    res.post(function (response) {
                        if (response.code != 0) {
                            //@TODO: throw exception
                        }
                        var objectList = Cache.get(cacheKey);
                        object.id = response.data.id;
                        objectList[object.id] = object;
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                    });

                    return deferred.promise;
                },
                save:  function (object, key, options) {
                    if (object.id) {
                        return this.update(object, key, options);
                    } else {
                        return this.insert(object, key, options);
                    }
                },
                update: function (object, cacheKey, options) {
                    var defaultOptions = {
                        url :          urlDefault+"/app/"+cacheKey
                    }
                    options = angular.extend(defaultOptions, options);
                    var deferred = $q.defer();
                    var res = this.resource('/:id', null, options);

                    res.put({id: object.id}, object, function (response) {
                        if (response.code != 0) {
                            //@TODO: throw exception
                        }
                        var objectList = Cache.get(cacheKey);
                        objectList[object.id] = object;
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                    });

                    return deferred.promise;
                },
                delete: function (object, cacheKey, options) {
                    var defaultOptions = {
                        url :          urlDefault+"/app/"+cacheKey
                    }
                    options = angular.extend(defaultOptions, options);

                    var deferred = $q.defer();
                    var res = this.resource('/'+object.id, null, options);

                    res.delete(function (response) {
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                            deferred.reject(response);
                        }
                        var objectList = Cache.get(cacheKey);
                        delete objectList[object.id];
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length > 1)? response.data: response.data[0]);
                    });

                    return deferred.promise;
                },
                resource: function (urlVar, params, options) {
                    params = params || {};
/*                    if (typeof params != "String") {
                        params = JSON.stringify(params);
                    }*/
                    return $resource(options['url'] + urlVar, params, {
                        put: {method: 'PUT'},
                        delete: {method: 'DELETE'}
                    });
                }
        };
    }])