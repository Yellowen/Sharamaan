var map;

var custom_button_func = function(){
    //Get a random coordinate from -90 to 90
    var random_lon = Math.floor(Math.random() * 360) - 180;
    var random_lat = Math.floor(Math.random() * 180) - 90;
    if(map.layers[0].opacity === 1){
	//If the layer opacity is 1 (fully opaque), then change it
	// and zoom
	map.layers[0].setOpacity(.5);
	map.setCenter(new OpenLayers.LonLat(random_lon,
					    random_lat), 3);
    }
    else{
	//If the layer opacity is anything but 1, change it and
	// zoom
	map.layers[0].setOpacity(1);
	map.setCenter(new OpenLayers.LonLat(random_lon,
					    random_lat), 3);
    }
};


function map_init() {

    OpenLayers.Lang.setCode('en');

    map = new OpenLayers.Map("map", {
	controls: []
    });
    var osm = new OpenLayers.Layer.OSM(
	"Open Street Map"
    );

    arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"];

    arrayAerial = ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"];

    baseOSM = new OpenLayers.Layer.OSM("MapQuest-OSM Tiles", arrayOSM);
    baseAerial = new OpenLayers.Layer.OSM("MapQuest Open Aerial Tiles", arrayAerial);

    map.addLayer(baseOSM);
    map.addLayer(baseAerial);

    map.addControls([
	new OpenLayers.Control.ZoomBox(),
	new OpenLayers.Control.ZoomToMaxExtent(),
	new OpenLayers.Control.PanZoomBar({}),
	new OpenLayers.Control.LayerSwitcher({}),
	new OpenLayers.Control.Permalink(),
	new OpenLayers.Control.MousePosition({})
    ]);

    map.addLayers([osm]);
    if (!map.getCenter()) {
	map.zoomToMaxExtent();
    }


    var wfsLayer = new OpenLayers.Layer.Vector("Test Polygons", {
        projection : "EPSG:4326",
        extractAttributes: true,
        visibility: true
    });

    editor = new OpenLayers.Editor(map, {
        activeControls: ['Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature',
			 'TransformFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature',
			 'MerigeFeature', 'Separator', 'ImportFeature', 'separator'],
        featureTypes: ['polygon', 'path', 'point'],
        editLayer: wfsLayer
    });
    editor.startEditMode();




}

$(function(){
    map_init();
});
