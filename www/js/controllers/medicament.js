/* global ApiClient */

var MedicamentController = {
  
    search: function(query) {
        ApiClient.getInstance().count(query, function(result) {
            if(result.count === 0) {
                alert('Nie znaleziono leku');
            } else if(result.count === 1) {
                ApiClient.getInstance().search(query, function(result) {
                    MedicamentController.renderSearch(result);
                });
            } else {
                ApiClient.getInstance().search(query, function(result) {
                    MedicamentController.renderSearch(result);
                });
            }
        });
    },
    
    leaflet: function(id) {
        ApiClient.getInstance().get(id, function(result) {
            if(result.length === 0) {
                alert("Brak ulotki dla wybranego leku");
            } else {
                MedicamentController.renderLeaflet(result);
            }
        });
    },
    
    renderSearch: function(medicaments) {
        var list = $('<ul>', {
            "data-role": "listview",
            "data-filter": true,
            "data-filter-placeholder": "Filtruj",
            "data-inset": true,
            "data-theme": "b"
        });
        $.each(medicaments, function(idx, element) {
            console.log(idx, element);
            var link = $('<a>', {
                text: element.label,
                "data-id": element.id,
                href: "#",
                onclick: "MedicamentController.leaflet($(this).data('id'))"
            });

            var listElem = $('<li>').append(link);
            list.append(listElem);
        });
        
        var panelId = "#link-results";
        $(panelId).html(list);
        $(panelId + " ul").listview();
    },
    
    renderLeaflet(result) {
        var panelId = "#searchResults";
        var leaflet = $('<div>');
        leaflet.append(
            $('<a>', {
                text: "Close panel",
                "data-rel": "close",
                href: panelId
            })
        );
        $.each(result, function(idx, element) {
            var header = $('<h3>', {
                text: element.header
            });
            leaflet.append(header);
            
            var content = $('<div>', {
                text: element.content
            });
            
            leaflet.append(content);
        });
        
        $(panelId).html(leaflet);
        $(panelId).trigger( "updatelayout" );
        $(panelId).panel( "open" );
    }
};