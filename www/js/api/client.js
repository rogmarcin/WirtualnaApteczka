/* global Config */

var imported = document.createElement('script');
imported.src = 'js/api/config.js';
document.head.appendChild(imported);

var ApiClient = (function () {
    var instance;
    
    function createInstance() {
        var Object = function() {
            
            var parent = this;
            
            var onBeginRequest;
            
            var onEndRequest;
            
            var alertFunction;
            
            function request(url, params, callback) {
                if(typeof parent.onBeginRequest !== "undefined") {
                    parent.onBeginRequest();
                }
                
                $.ajax({
                    url: Config.baseUrl + url,
                    data: params,
                    method: 'get',
                    dataType: 'json',
                    async: true,
                    headers: {
                        'Authorization': 'Basic '
                        + btoa(Config.clientId + ":" + Config.clientSecret)
                    },
                    success: function(data, textStatus, jqXHR) {
                        if(typeof callback !== "undefined") {
                            callback(data, textStatus);
                        }
                    },
                    /**
                     * 
                     * @param {jqXHR} jqXHR
                     * @param {string} textStatus
                     * @param {string} errorThrown
                     * @returns {undefined}
                     */
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error(jqXHR);
                        var msg = "Wystąpił błąd: " + jqXHR.state();
                        if(typeof parent.alertFunction !== "undefined") {
                            parent.alertFunction(msg);
                        } else {
                            alert(msg);
                        }
                    },
                    complete: function() {
                        if(typeof parent.onEndRequest !== "undefined") {
                            parent.onEndRequest();
                        }
                    }
               });
            };
            
            /**
             * Search for medicament
             * 
             * @param {string} query Medicament name
             * @param {function} callback Callback function calls on success.
             *      Sygnature of the function: function(Object json);
             * @returns {undefined}
             */
            var search = function(query, callback) {
                    request('/medicament', {
                        query: query
                    }, callback
                );
            };
            
            /**
             * Count number of founded medicament
             * 
             * @param {string} query Medicament name
             * @param {function} callback Callback function calls on success.
             *      Sygnature of the function: function(Object json);
             * @returns {undefined}
             */
            var count = function(query, callback) {
                    request('/medicament/count', {
                        query: query
                    }, callback
                );
            };
            
            /**
             * Count number of founded medicament
             * 
             * @param {integer} id Identifier od medicament
             * @param {function} callback Callback function calls on success.
             *      Sygnature of the function: function(Object json);
             * @returns {undefined}
             */
            var get = function(id, callback) {
                    request('/medicament/' + id + '/leaflet', {}, callback
                );
            };
            
            /**
             * Gets summary of the medicament
             * Summary contains real name, price if set, dosing, etc
             * 
             * @param {integer} id Identifier od medicament
             * @param {function} callback Callback function calls on success.
             *      Sygnature of the function: function(Object json);
             * @returns {undefined}
             */
            var summary = function(id, callback) {
                    request('/medicament/' + id + '/summary', {}, callback
                );
            };
            
            /**
             * Get real name the medicamen
             * 
             * @param {integer} id Identifier od medicament
             * @param {function} callback Callback function calls on success.
             *      Sygnature of the function: function(Object json);
             * @returns {undefined}
             */
            var name = function(id, callback) {
                    request('/medicament/' + id + '/name', {}, callback
                );
            };

            return {
                search: search,
                count: count,
                get: get,
                summary: summary,
                name: name,
                setOnBeginRequest: function(callback) {
                    parent.onBeginRequest = callback;
                },
                setOnEndRequest: function(callback) {
                    parent.onEndRequest = callback;
                },
                setAlertFunction: function(callback) {
                    parent.alertFunction = callback;
                }
            };
        };

        return new Object();
    }

    return {
        getInstance: function () {
            if(!window.jQuery) {
                console.error('jQuery is required');
                return null;
            }
            
            if (!instance) {
                instance = createInstance();
            }
            
            return instance;
        }
    };
})();

