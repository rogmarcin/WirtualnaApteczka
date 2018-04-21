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
    }
    
};