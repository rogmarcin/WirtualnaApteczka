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
    
    this.submitSave = function() {
        var result = {};
        $.each($(this.pageId + ' form').serializeArray(), function() {
            result[this.name] = this.value;
        });
        
        var id = result['medicament-id'];
        
        this.save(id, result);
    };
    
    this.populateMedicamentIdForm = function(id) {
        $(this.pageId + ' input[name="medicament-id"]').val(id);
    };
    
    this.populateMedicamentNameForm = function(name) {
        console.log(name);
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
        if(id) {
            this.api.get(id, function(leflet) {
                data['leaflet'] = leflet;
                var userId = Helper.userId();
                firebase.database().ref('medicaments/' + userId +'/' + id).set(data);
            });
        } else {
            id = Helper.uuid();
            data['leaflet'] = null;
            var userId = Helper.userId();
            firebase.database().ref('medicaments/' + userId +'/' + id).set(data);
        }
    };
    
    return this;
})();