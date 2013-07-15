define([
    "jquery",
    "underscore",
    "backbone",
    "models/lands",
    "text!/erb/lands/list.html.erb",
    "text!/erb/lands/entry.html.erb"
], function($, _, Backbone, Models, Template, EntryTemplate) {

    var Layer = Models.Land;
    var Layers = Models.Lands;

    var LayersList = Backbone.View.extend ({

	el: $("#container"),

	options: {
	    section: "body",
	},

	events: {
	    "click #save-new-layer": "new_layer",
	    "click .edit-layer-vector": "edit_in_map",
	    "click .remove-layer": "remove_layer",
	    "click .save-layer": "save-layer",
	},

	initialize: function() {
	    if (this.options.section == "side") {
		this.el = $("#panelcontent");
	    }
	    // TODO: Get all the layers
	    this.layers = new Layers();
	    this.layers.fetch();
	},

	render: function(){
	    var template = _.template(Template, {layers: []});
	    this.el.html(template);
	},

	// Event Handlers -----------------------------------------------
	new_layer: function(){

	    var layer_data = this.validate_form();
	    var layer = new Layer(layer_data);
	    layer.set("id", Math.floor((Math.random()* 100000) + 80000));
	    layer.set("is_new", true);
	    this.add_to_list(layer);
	    this.layers.add([layer]);
	    $("#add-layer-modal").modal('hide');
	},

	edit_in_map: function(event){
	    var target = event.currentTarget;
	    var layer_id = parseInt($(target).data("id"));
	    var layer = this.layers.get(layer_id);
	    document.map.trigger("map:edit-layer", layer);

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
	    document.getElementById("new-layer-form").reset();
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
