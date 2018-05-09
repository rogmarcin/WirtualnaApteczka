/* global MedicamentController */

function redirectToMedicament(id) {
    console.log('received medicament id: ' + id);
    MedicamentController.get(id);
    location.hash = "medicine";
}

var Application = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        var medicamentId = window.sessionStorage.getItem("medicamentId");
        window.sessionStorage.removeItem("medicamentId");
        
        if(medicamentId !== null && medicamentId !== "") {
            redirectToMedicament(medicamentId);
        }
        
        MedicamentController.list();
        MedicamentController.notify();
        
        $('.load-user-email').html(Helper.userEmail());
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
//        Application.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//        console.log('Received Event: ' + id);
    }
};