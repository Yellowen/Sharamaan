define([
    "backbone"
], function(Backbone) {
    var Layer = Backbone.Model.extend({
	url: "/layers"
    });

    var Layers = Backbone.Collection.extend({
	url: "/layers"
    });

    return {
	"Layer": Layer,
	"Layers": Layers,
    }
});
