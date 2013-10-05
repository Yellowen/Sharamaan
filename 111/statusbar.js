define([
    "jquery",
    "underscore",
    "backbone",
    "openlayers",
    "text!/erb/statusbar/bar.html.erb",
], function($, _, Backbone, OpenLayers, BarTemplate) {

    var StatusBar = Backbone.View.extend ({

        el: $("#statusbar"),

        current_layer: null,

        events: {
            "statusbar:redraw": "redraw",
        },

        initialize: function () {
        },

        render: function(context_){
            context = context_|| {layer: null};
            var template = _.template(BarTemplate, context);
            $(this.el).html(template);
        },

        redraw: function(layer) {
            this.current_layer = layer;
            this.render({"layer": layer});
        },

        edit_layer: function(layer) {
            this.render({"layer": layer,
                         is_edit_time: true});
        }

    });

    return StatusBar;
});
