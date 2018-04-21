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
        var list = $('<ul>');
        $.each(medicaments, function(idx, element) {
            console.log(idx, element);
            var link = $('<a>', {
                text: element.label,
                "data-id": element.id,
                onclick: "MedicamentController.leaflet($(this).data('id'))"
            });

            var listElem = $('<li>').append(link);
            list.append(listElem);
        });
        
        $('#searchResults').html(list);
    },
    renderLeaflet(result) {
        var leaflet = $('<div>');
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
        
        $('#searchResults').html(leaflet);
    }
};