require.config({
    shim: {
	'underscore': {
	    exports: "_"
	},
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
	'openlayers': {
	    exports: 'OpenLayers',
	},
	"ole_lang": {
	    deps: ["openlayers"]
	},
	"ole": {
	    deps: [
		"ole_lang"
	    ],
	}
	/*'relational': {
	    deps: ['backbone', ],
	}*/
    },
    baseUrl: "/statics/js",
    paths: {
	jquery: document.media_url + 'js/lib/jquery/jquery.min',
	underscore: document.media_url + 'js/lib/documentcloud/underscore',
	backbone: document.media_url + 'js/lib/documentcloud/backbone',
	ole_lang: document.media_url + 'lib/ole/lib/Editor/Lang/' + document.lang_code,
	ole: document.media_url + "lib/ole/ole.min",
	openlayers: document.media_url + 'lib/openlayers/OpenLayers',

	//relational: '/statics/lib/backbone/backbone-relational',
	//bbloader: '/statics/lib/backbone/bbloader',
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});
