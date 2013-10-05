define([
    "jquery",
    "openlayers",
    "ole",
    "underscore",
    "backbone",
], function($, OpenLayers, OLE, _, Backbone){

    var events = {
        "map:edit-layer": "edit_layer",
    };

    var handlers = {
        edit_layer: function(layer) {

            console.log(layer);
            var editor = document.map_editor;
            if (editor.is_modified) {
                if (!confirm("لایه فعلی ذخیره نشده است. آیا مطمین هستید؟")) {
                    return;
                }
            }

            editor.startEditMode();
            editor.editLayer.removeFeatures();

            editor.editLayer = layer;

            document.statusbar.edit_layer(layer);
        },
    };


    function map_init() {

        var map, editor;

        // Setup language
        OpenLayers.Lang.setCode(document.lang_code);

        // Setup map object
        map = new OpenLayers.Map("map", {
            controls: []
        });

        // Setup editor object
        // TODO: Add a control to panel which allow user to switch between
        //       Advance and basic mode.
        editor = new OpenLayers.Editor(map, {
            activeControls: ['ImportFeature', 'Separator', 'Navigation', 'CADTools',
                             'TransformFeature', 'Separator',
                             'DeleteFeature','DeleteAllFeatures', 'SplitFeature', 'DragFeature', 'SelectFeature', 'MergeFeature',
                             'Separator', 'DrawHole', 'ModifyFeature', 'DrawText',
                             'Separator'],
            featureTypes: ['regular', 'polygon', 'path', 'point']
        });


        // Setup base layer
        var osm = new OpenLayers.Layer.OSM(
            "Open Street Map"
        );

        // Setup controls
        map.addControls([
            new OpenLayers.Control.ZoomBox(),
            new OpenLayers.Control.ZoomToMaxExtent(),
            new OpenLayers.Control.PanZoomBar({}),
            new OpenLayers.Control.LayerSwitcher({}),
            new OpenLayers.Control.Permalink(),
            new OpenLayers.Control.MousePosition({})
        ]);

        /*var v1 = new OpenLayers.Layer.Vector("Test1", {

          projection : "EPSG:4326",
          extractAttributes: true,
          visibility: true
          /*protocol: new OpenLayers.Protocol.HTTP({
          url: 'some_data.json',
          format: new OpenLayers.Format.GeoJSON({})
          }),
          strategies: [save_strategy]
          });
          map.addLayer(v1);*/


        map.addLayers([osm]);
        if (!map.getCenter()) {
            map.zoomToMaxExtent();
        }

        // Setup event handlers
        _.extend(map, Backbone.Events);
        map.handlers = handlers
        map.events = events;

        _.each(map.events, function(v, k) {
            map.on(k, map.handlers[v], map);
        });


        document.map = map;
        document.map_editor = editor;


    }
    return map_init;
})
