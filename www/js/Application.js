/* global MedicamentController */

var Application = {
    // Application Constructor
    initialize: function() {
        this.redirectOnNotification();
        this.bindEvents();
        
        MedicamentController.list();
        MedicamentController.notify();
        
        $('.load-user-email').html(Helper.userEmail());
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if(typeof plugin !== "undefined") {
            plugin.notification.local.on("click", function (notification) {
                Helper.redirectToMedicament(notification.data);
            });
        }
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
    },
    redirectOnNotification: function() {
        var medicamentId = window.sessionStorage.getItem("medicamentId");
        window.sessionStorage.removeItem("medicamentId");
        
        if(medicamentId !== null && medicamentId !== "") {
            Helper.redirectToMedicament(medicamentId);
        }
    }
};