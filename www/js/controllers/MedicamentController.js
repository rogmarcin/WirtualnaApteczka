/* global Helper */
/* global ApiClient */
/* global MedicamentView */

var MedicamentController = (function() {
    
    this.view = MedicamentView;
    
    this.pageId = '#add_medicines';
    
    this.api = ApiClient.getInstance();
    this.api.setOnBeginRequest(Helper.showLoader);
    this.api.setOnEndRequest(Helper.hideLoader);
    this.api.setAlertFunction(Helper.dialog);
    
    this.submitSearch = function(event, caller) {
        event.stopPropagation();
        var medicamentName = $(this.pageId + ' input[name="medicament-name"]').val();
        
        this.search(medicamentName);
        return false;
    };
    
    this.resetSaveForm = function() {
        $.each($(this.pageId + ' form input'), function() {
            $(this).val('');
        });
        
        $(this.pageId + " .link-results").html('');
    };
    
    this.submitSave = function() {
        Helper.showLoader();
        var result = {};
        var success = true;
        
        $.each($(this.pageId + ' form').serializeArray(), function() {
            result[this.name] = this.value;
            
            if(this.name !== 'medicament-id' && this.value === '') {
                success = false;
                return;
            }
        });
        
        if(success === false) {
            Helper.hideLoader();
            Helper.dialog('Wszystkie pola są wymagane');
            return false;
        }
        
        var id = result['medicament-id'];
        
        this.save(id, result);
    };
    
    this.populateMedicamentIdForm = function(id) {
        $(this.pageId + ' input[name="medicament-id"]').val(id);
    };
    
    this.populateMedicamentNameForm = function(name) {
        $(this.pageId + ' input[name="medicament-name"]').val(name);
    };
    
    this.search = function(query) {
        var parent = this;
        ApiClient.getInstance().count(query, function(result) {
            if(result.count === 0) {
                Helper.dialog('Nie znaleziono leku');
            } else if(result.count === 1) {
                ApiClient.getInstance().search(query, function(result) {
                    parent.view.renderSearch(result);
                });
            } else {
                ApiClient.getInstance().search(query, function(result) {
                    parent.view.renderSearch(result);
                });
            }
        });
    };
    
    this.leaflet = function(id) {
        var parent = this;
        ApiClient.getInstance().get(id, function(result) {
            if(result.length === 0) {
                Helper.dialog("Brak ulotki dla wybranego leku");
            } else {
                parent.populateMedicamentIdForm(id);
                ApiClient.getInstance().name(id, function(result, status) {
                    parent.populateMedicamentNameForm(result[0].name);
                });
                parent.view.renderLeaflet(result);
            }
        });
    };
    
    this.save = function(id, data) {
        data['medicament-name'] = Helper.capitalize(data['medicament-name']);
        
        if(id) {
            this.api.get(id, function(leflet) {
                var userId = Helper.userId();
                
                var leafletString = "";
                $.each(leflet, function() {
                    leafletString += " " + this.header + " " + this.content;
                });
                
                data['search'] = leafletString.toLowerCase();
                data['leaflet'] = leflet;
                
                firebase.database().ref('medicaments/' + userId +'/' + id).set(data);
            });
        } else {
            id = Helper.uuid();
            data['leaflet'] = null;
            data['medicament-id'] = id;
            var userId = Helper.userId();
            firebase.database().ref('medicaments/' + userId +'/' + id).set(data);
        }
        
        Helper.hideLoader();
        
        this.view.renderAddSuccessDialog();
    };
    
    this.list = function() {
        Helper.showLoader();
        var parent = this;
        var userId = Helper.userId();
        
        firebase.database()
            .ref('/medicaments/' + userId)
            .orderByChild("/medicament-name")
            .on('value', function(snapshot) {
                Helper.hideLoader();
                parent.view.renderList(snapshot);
        });
    };
    
    this.get = function(id, callback) {
        Helper.showLoader();
        var parent = this;
        var userId = Helper.userId();
        
        firebase.database()
            .ref('/medicaments/' + userId + '/' + id)
            .on('value', function(snapshot) {
                Helper.hideLoader();
                parent.view.renderSingle(snapshot.val());
                if(typeof callback !== "undefined") {
                    callback();
                }
        });
    }
    
    this.remove = function(event, caller) {
        event.stopPropagation();
        event.preventDefault();
        
        var userId = Helper.userId();
        var id = $(caller).data('id');
        
        firebase.database()
            .ref('/medicaments/' + userId + '/' + id)
            .off('value');
    
        firebase.database()
            .ref('/medicaments/' + userId + '/' + id)
            .remove();
    
        parent.removeNotification(id);
    
        Helper.dialog("Lek został usunięty", function() {
            location.hash = $(caller).attr("href");
        });
    }
    
    this.searchByLeaflet = function(event, caller) {
        Helper.showLoader();
        var parent = this;
        var userId = Helper.userId();
        
        var filter = $(caller).closest('.search-page-container').find('input').val();
        
        firebase.database()
            .ref('/medicaments/' + userId)
            .orderByChild("/medicament-name")
            .once('value', function(snapshot) {
                Helper.hideLoader();
                parent.view.renderList(snapshot, filter.toLowerCase(), "#list_of_medicines_search");
                location.hash = "#list_of_medicines_search";
        });
    };
    
    this.notify = function() {
        var parent = this;
        var userId = Helper.userId();
        
        if(typeof plugin !== "undefined") {
            firebase.database()
                .ref('/medicaments/' + userId)
                .orderByChild("/medicament-name")
                .on('value', function(snapshot) {
                    snapshot.forEach(function (snapshotElem) {
                        var medicament = snapshotElem.val();
                        
                        parent.removeNotification(
                            medicament['medicament-id']
                        );

                        var date = new Date();
                        var minutes = date.getMinutes() + 1;
                        date.setMinutes(minutes);

                        if (Helper.isExpired(medicament['medicament-expire-at'])) {
                            plugin.notification.local.schedule({
                                id: medicament['medicament-id'],
                                title: `Koniec ważności ${medicament['medicament-name']}`,
                                message: `Lek ${medicament['medicament-name']} utracił swoją ważność`,
                                firstAt: date,
                                foreground: true,
                                data: medicament['medicament-id']
                            });
                        }
                    });
            });
        }
        
    };
    
    this.removeNotification = function(id) {
        if(typeof plugin !== "undefined") {
            plugin.notification.local.cancel(
                id,
                function() {
                    console.log('canceled notifications');
            });
        }
    };
    
    return this;
})();