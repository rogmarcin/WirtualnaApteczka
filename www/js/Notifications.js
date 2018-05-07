//example of local notification
document.addEventListener('deviceready', function () {
    // window.plugin.notification.local is now available
    window.plugin.notification.local.add({
        title: 'Przeterminowane leki',
        message: 'W apteczce posiadasz przeterminowane leki.',
        //firstAt: date,  firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
        //every: "week",  this also could be minutes i.e. 25 (int)
        foreground: true
    });

}, false);

/* Cancel notification
cordova.plugins.notification.local.cancel(1, function() {
    alert("done");
}); */