define([
    "jquery",
], function($){

    function resize_map(){
	// Retrieve container size
	var width = $('#skel').width();
	var height = $('#skel').height();

	//console.log("Skel Width: " + width);
	//console.log("Skel Height: " + height);

	// Get the header heiight
	var header_height = $("header").height();

	var panelwidth = $("#panel").width();
	var statusbarheight = $("#statusbar").height();

	var map_width = width - panelwidth;
	var map_height = height - header_height - statusbarheight;

	// set new size
	$("#map").width(map_width).height(map_height);
	$("#statusbar").width(map_width);
	$("#panel").height(map_height + statusbarheight);

	// store new size
	document.map_size = {width: map_width,
			height: map_height};

    }
    return {
	resize_map: resize_map,
    }
})
