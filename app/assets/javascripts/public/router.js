$(function(){
	SD.SummarizationRouter = Backbone.Router.extend({
		routes: {
			'(/)': 'home'
		},
		initialize: function(){
		},
		home: function(){
			var documentList = new DocumentListView();
		}
	})
})
