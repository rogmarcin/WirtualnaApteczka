/* global ApiClient */

MedicamentView = {
    renderSearch: function(medicaments) {
        var list = $('<ul>', {
            "data-role": "listview",
            "data-filter": true,
            "data-filter-placeholder": "Filtruj",
            "data-inset": true,
            "data-theme": "a"
        });
        $.each(medicaments, function(idx, element) {
            var link = $('<a>', {
                text: element.label,
                "data-id": element.id,
                href: "#",
                onclick: `MedicamentController.leaflet($(this).data('id'))`
            });

            var listElem = $('<li>').append(link);
            list.append(listElem);
        });
        
        var panelId = "#add_medicines .link-results";
        $(panelId).html(list);
        $(panelId + " ul").listview();
    },
    
    renderLeaflet(result) {
        var panelId = "#add_medicines .search-results";
        var leaflet = $('<div>', {
            style: "overflow-y: auto"
        });
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
        
        $(panelId).find('.ui-panel-inner').html(leaflet);
        $(panelId).trigger( "updatelayout" );
        $(panelId).trigger( "create" );
        $(panelId).panel( "open" );
    },
    
    renderAddSuccessDialog() {
        $("#add_medicines .success-dialog").popup().popup("open");
    },
    
    renderList(medicaments) {
        var list = $('<ul>', {
            "data-role": "listview",
            "data-filter": true,
            "data-filter-placeholder": "Filtruj",
            "data-theme": "a",
            "data-autodividers": true
        });
        
        medicaments.forEach(function(element) {
            var element = element.val();
            
            var image = $('<i>', {
                class: 'ui-li-icon ui-corner-none fas fa-tablets',
                style: 'display: inline-block; margin-right: 5px',
            });
            
            var link = $('<a>', {
                text: element['medicament-name'],
                "data-id": element['medicament-id'],
                href: "#medicine",
                onclick: `MedicamentController.get($(this).data('id'))`
            }).prepend(image);
            

            var listElem = $('<li>');
            
            if(Helper.isExpired(element['medicament-date'])) {
                listElem.attr('data-icon', 'info');
                link.css('background-color', '#d9534f')
                    .css('color', '#FFFFFF')
                    .css('text-shadow', 'none');
            }
            
            listElem.append(link);
            
            list.append(listElem);
        });
        
        var panelId = "#list_of_medicines .ui-content";
        $(panelId).html(list);
        $(panelId + " ul").listview();
    },
    
    renderSingle(medicament) {
        var leaflet = '';

        if(typeof medicament.leaflet !== 'undefined') {
            $.each(medicament.leaflet, function(idx, element) {
                var section = `
<h4>${element.header}</h4>
<p>${element.content}</p>
`;          
            leaflet += section;
            });
        }
        
        var elem = `
<div>
    <h3>${medicament['medicament-name']}</h3>
    <p>${medicament['medicament-description']}</p>
    <p><strong>Data zakupu:</strong> ${medicament['medicament-date']}</p>
    <p><strong>Data ważności:</strong> ${medicament['medicament-expire-at']}</p>
    <p><strong>Dawkowanie zalecane przez lekarza:</strong> ${medicament['medicament-dosage']}</p>
    ${leaflet}
</div>
`;
        
        $('#medicine .ui-content').html(elem);
    }
    
};