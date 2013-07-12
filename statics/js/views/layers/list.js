define([
    "jquery",
    "underscore",
    "backbone",
], function($, _, Backbone) {
    var LayersList = Backbone.View.extend ({

	el: null,

	options: {
	    section: "body",
	},
	initialize: function() {
	    if (this.options.section == "side") {
		this.el = $("#panelcontent");
	    }
	    else {
		this.el = $("#container");
	    }

	    // TODO: Get all the layers

	},

	render: function(){
	    var that = this;
	    require(["text!/erb/layers/list.html.erb"], function(Template) {
		var template = _.template(Template, {layers: []});
		that.el.html(template);
	    });
	},
    });

    return LayersList;
});
