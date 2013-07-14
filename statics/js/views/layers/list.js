define([
    "jquery",
    "underscore",
    "backbone",
    "models/layer",
    "text!/erb/layers/list.html.erb",
    "text!/erb/layers/entry.html.erb"
], function($, _, Backbone, Models, Template, EntryTemplate) {

    var Layer = Models.Layer;
    var Layers = Models.Layers;

    var LayersList = Backbone.View.extend ({

	el: $("#container"),

	options: {
	    section: "body",
	},

	events: {
	    "click #save-new-layer": "new_layer"
	},

	initialize: function() {
	    if (this.options.section == "side") {
		this.el = $("#panelcontent");
	    }
	    // TODO: Get all the layers
	    var layers = new Layers();
	    layers.fetch();
	},

	render: function(){
	    var template = _.template(Template, {layers: []});
	    this.el.html(template);
	},

	new_layer: function(){
	    var layer_data = this.validate_form();
	    var layer = new Layer(layer_data);
	    layer.set("is_new", true);
	    this.add_to_list(layer);
	},


	// Internal ----------------------------------------------
	validate_form: function(){
	    // TODO: Create a form validator solution for views
	    var layer = {};
	    layer["name"] = $("#layer-name").val();
	    if (layer.name == ""){
		// TODO: create an alerting solution
		console.log("TODO: alert");
	    }
	    return layer;
	},
	add_to_list: function(layer) {
	    console.log(layer);

	    var template = _.template(EntryTemplate, {"layer": layer});
	    $(".layers-list").each(function(){
		$(this).prepend(template);
	    });

	},

    });

    return LayersList;
});
