define(['backbone.marionette', 'public/views/root_view'], function(Marionette, RootView){
	var SummarizationDemoApp = Marionette.Application.extend({
		region: '#app-root',
		template: JST['layout'],
		onStart: function(){
			console.log("start");
			this.showView(new RootView());
			Backbone.history.start();
		}
	})

	var app = new SummarizationDemoApp();
	app.start();
})
// Marionette = require('backbone.marionette');
// RootView = require('public/views/root_view');

