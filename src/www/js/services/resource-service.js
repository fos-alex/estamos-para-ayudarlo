angular.module('EPA.services')
.factory('Resource',
    ['$http' ,'$state', '$rootScope', '$q', '$timeout', '$resource', '$ionicLoading', 'CONFIG', 'Cache',
        function resourceFactory ($http, $state, $rootScope, $q, $timeout, $resource, $ionicLoading, CONFIG, Cache)
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
                        $ionicLoading.show({template: 'Cargando...'});
                        res.get(function (response) {
                            $ionicLoading.hide();
                            if (response.codigo != 0) {
                                //@TODO: throw exception
                                deferred.reject(response);
                            }
                            deferred.resolve(response.data);
                            if (response.data instanceof Array) {
                                for (var element in response.data) {
                                    if (!resource) {
                                        resource = Cache.get(key);
                                    }
                                    resource[element.id] = element;
                                }
                            } else {
                                if (!resource) {
                                    resource = Cache.get(key);
                                }
                                resource[response.data.id] = response.data;

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
                    var res = this.resource('/', null, options);

                    $ionicLoading.show({template: 'Cargando...'});
                    res.post(object, function (response) {
                        $ionicLoading.hide();
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                            deferred.reject(response);
                        }
                        var objectList = Cache.get(cacheKey);
                        object.id = response.data.id;
                        objectList[object.id] = object;
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length <= 1)? response.data: response.data[0]);
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

                    $ionicLoading.show({template: 'Cargando...'});
                    res.put({id: object.id}, object, function (response) {
                        $ionicLoading.hide();
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                            deferred.reject(response);
                        }
                        var objectList = Cache.get(cacheKey);
                        objectList[object.id] = object;
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length <= 1)? response.data: response.data[0]);
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

                    $ionicLoading.show({template: 'Cargando...'});
                    res.delete(function (response) {
                        $ionicLoading.hide();
                        if (response.codigo != 0) {
                            //@TODO: throw exception
                            deferred.reject(response);
                        }
                        var objectList = Cache.get(cacheKey);
                        delete objectList[object.id];
                        Cache.set(cacheKey, objectList);
                        deferred.resolve((Object.keys(response.data).length <= 1)? response.data: response.data[0]);
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
                        delete: {method: 'DELETE'},
                        post: {method: 'POST'}
                    });
                }
        };
    }])