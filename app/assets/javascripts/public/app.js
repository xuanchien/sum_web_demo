define(['jquery',
	'bootstrap-sprockets',
	'backbone.marionette',
	'public/views/root_view',
	'public/models/document'
	],
	function(jQuery, Bootstrap, Marionette, RootView, Document){
	var rootView = new RootView();

	var Controller = Marionette.Object.extend({
		showDoc: function(id){
			var d = new Document({id: id});
			d.fetch().done(function(){
				rootView.viewDocumentModel(d);
			})
		}
	})
	var Router = Marionette.AppRouter.extend({
		controller: new Controller(),
		appRoutes: {
			'doc/:id': 'showDoc'
		}
	})
	var SummarizationDemoApp = Marionette.Application.extend({
		region: '#app-root',
		template: JST['layout'],
		onStart: function(){
			var router = new Router();
			this.showView(rootView);
			Backbone.history.start();
		}
	})

	var app = new SummarizationDemoApp();
	app.start();
})
