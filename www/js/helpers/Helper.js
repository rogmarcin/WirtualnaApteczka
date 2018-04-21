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
    }
};