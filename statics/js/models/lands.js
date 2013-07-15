define([
    "backbone"
], function(Backbone) {
    var Land = Backbone.Model.extend({
	url: "/lands"
    });

    var Lands = Backbone.Collection.extend({
	url: "/lands"
    });

    return {
	"Land": Land,
	"Lands": Lands,
    }
});
