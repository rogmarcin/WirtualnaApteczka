/* global Helper */
/* global ApiClient */
/* global DemoView */

var MedicamentController = function(view) {
    
    this.view;
    
    this.api = ApiClient.getInstance();
    this.api.setOnBeginRequest(Helper.showLoader);
    this.api.setOnEndRequest(Helper.hideLoader);
    this.api.setAlertFunction(Helper.dialog);
    
    if(typeof view === "string") {
        this.view = eval(view);
    } else if(typeof this.view === "object") {
        this.view = view; 
    } else {
        console.error('View must be either string or object');
   }
  
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
                parent.view.renderLeaflet(result);
            }
        });
    };
};;