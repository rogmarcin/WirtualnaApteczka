var Helper = {
    showLoader: function() {
        $.mobile.loading( "show", {
          text: "Trwa ładowanie...",
          textVisible: true,
          theme: "a",
        });
    },
    hideLoader: function() {
        $.mobile.loading("hide");
    },
    dialog: function(textContent) {
        var html = `
<div data-role="popup" id="popupDialog" data-overlay-theme="b" data-theme="a" data-dismissible="false" style="max-width:400px;">
    <div role="main" class="ui-content" style="text-align: center">
        <p>{content}</p>
        <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Ok</a>
    </div>
</div>
`;
        var dialog = html.replace('{content}', textContent);
        $(dialog).popup().popup("open");
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
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        
        return uuid;
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
    }
};