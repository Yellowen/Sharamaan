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
	console.log(this.options.section);

	// TODO: Get all the layers

    },

    render: function(){
	var template = _.template($("#erb-layers-list").html(), {});
	this.el.html(template);
    },
});
