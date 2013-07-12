var map, editor;
var save_strategy;
var v1;
var json = new OpenLayers.Format.JSON({});

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
