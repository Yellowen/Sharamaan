define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){


    var AppRouter = Backbone.Router.extend({
	routes: {
	    // Layers
	    //"layers": "layers-list",
	    "layers(-:section)": "layers-list",
	    '*actions': 'default_action'
	}
    });

    var initialize = function() {
	var router = new AppRouter();

	router.on('route:layers-list', function(section){
	    require(['views/layers/list'], function(LayersList){
		var view = new LayersList({section: section});
		view.render();
	    })
	});
	/*
	  router.on('route:layers-list-side', function(){
	  var view = new LayersList({section: "side"});
	  view.render();
	*/
	router.on('route:default_action', function(actions){
	    console.log('No route:' +  actions);
	});

	//Backbone.history.start({pushState: true});
	Backbone.history.start();
    }
    return {
	initialize: initialize
    };
});
