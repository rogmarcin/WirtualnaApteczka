/* global Config */

var imported = document.createElement('script');
imported.src = 'js/api/config.js';
document.head.appendChild(imported);

var ApiClient = (function () {
    var instance;

    function createInstance() {
        var Object = function() {
            function request(url, params, callback) {
                $.ajax({
                    url: Config.baseUrl + url,
                    data: params,
                    method: 'get',
                    dataType: 'json',
                    username: Config.clientId,
                    password: Config.clientSecret,
                    success: function(data, textStatus, jqXHR) {
                        console.log(data);
                        
                        if(callback !== null) {
                            callback(data, textStatus);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }    
               });
            };
            
            var search = function(query) {
                    request('/medicament', {
                        query: query
                    }
                );
            };
            
            var count = function(query) {
                    request('/count', {
                        query: query
                    }
                );
            };
            
            var get = function(id) {
                    request('/medicament/' + id + '/leaflet', {}, null
                );
            };
            
            var summary = function(id) {
                    request('/medicament/' + id + '/summary', {}, null
                );
            };
            
            var name = function(id) {
                    request('/medicament/' + id + '/name', {}, null
                );
            };

            return {
                search: search,
                count: count,
                get: get,
                summary: get,
                name: name
            };
        };

        return new Object();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

