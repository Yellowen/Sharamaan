define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    "lib/utils",
    "bootstrap"
], function($, _, Backbone, Router, func_map){
    var initialize = function(){
	Router.initialize();

	$(function(){

	    func_map.map_init();

	    // ---------------------------------------------------------
	    // TODO: Remove this snippet of code with more suitable one.
	    //       This code handles the panel handler
	    // Set the #map size
	    console.log("Setting new size");
	    func_map.resize_map();

	    // bound the resize_map function to window resize event
	    $(window).resize(func_map.resize_map);

	    // Set the panel height
	    //$("#panel").height(document.map.height);
	    // Click event handler of panelhandler
	    $("#panelhandle").click(function(){
		if ($(this).hasClass("opened")) {
		    $(this).removeClass("opened").css("left", "0");
		    $("#map").css("left", "0");
		    $("#panel").hide();
		    func_map.resize_map();

		}
		else {
		    $(this).css("left", "354px").addClass("opened");
		    $("#panel").show();
		    $("#map").width($("#map").width() - 354).css("left", "354px");

		}
		document.map.updateSize();

	    });
	    // ----------------------------------------------------------

	});

    }

    return {
	initialize: initialize
    };
});
