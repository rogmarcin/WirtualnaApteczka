var Helper = {
    showLoader: function() {
        $.mobile.loading( "show", {
          text: "Trwa ładowanie...",
          textVisible: true,
          theme: "a",
        });
    },
    hideLoader: function(callback) {
        $.mobile.loading("hide");
    },
    dialog: function(textContent, callback) {
        var id = 'helper-dialog';
        var html = `
<div data-role="popup" id="${id}" data-overlay-theme="b" data-theme="a" data-dismissible="false" style="max-width:400px;">
    <div role="main" class="ui-content ui-content-popup" style="text-align: center">
        <p>{content}</p>
        <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Ok</a>
    </div>
</div>
`;
        var dialog = html.replace('{content}', textContent);
        $(dialog).popup({
            afterclose: function(event, ui) {
                $(`#${id}`).popup('destroy');
                if(typeof callback !== "undefined") {
                    callback();
                }
            }
        }).popup("open");
    },
    userEmail: function() {
        var user = firebase.auth().currentUser;
        return user ? user.email : null;
    },
    userDisplayName: function() {
        var user = firebase.auth().currentUser;
        return user ? user.displayName : null;
    },
    userId: function() {
        var user = firebase.auth().currentUser;
        return user ? user.uid : null;
    },
    uuid: function() {
        var min = 1000000;
        var max = 1500000;
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    isExpired: function(dateString) {
        var date = new Date(dateString);
        
        
        if(date === 'Invalid Date') {
            return false;
        } else {
            var now = new Date();
            now.setHours(0,0,0,0);
            
            return now > date;
        }
    },
    capitalize: function(s) {
        var sType = typeof s;
        if(sType === 'undefined' || sType === null) {
            return '';
        } else {
            return s[0].toUpperCase() + s.slice(1);
        }
    },
    redirectToMedicament: function(id) {
        console.log('received medicament id: ' + id);
        MedicamentController.get(id, function() {
            location.hash = "medicine";
        });
    }
};