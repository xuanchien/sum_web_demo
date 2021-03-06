define(['backbone',
	'backbone.marionette',
	'public/views/document_list_view',
	'public/views/empty_document_content_view',
	'public/views/document_content_view'],
	function(Backbone, Marionette, DocumentListView, EmptyDocumentContentView, DocumentContentView){
	return Marionette.View.extend({
		template: JST['public/templates/layout'],
		regions: {
			docList: '#doc-list-section',
			mainContent: '#main-content-section'
		},
		id: 'body-container',
		childViewEvents: {
			'child:click': 'showDocumentContent'
		},
		events: {
			'keyup #search-bar': 'searchFile',
			'click #doc-list-section': 'scrollNow'
		},
		onRender: function(){
			this.documentListView = new DocumentListView();
			this.showChildView('docList', this.documentListView);
			this.showChildView('mainContent', new EmptyDocumentContentView());
		},
		onDomRefresh: function(){
			var self = this;
			$("#doc-list-section").on('scroll', function(){
				self.scroll();
			});
		},
		showDocumentContent: function(childView){
			this.viewDocumentModel(childView.model);
		},
		viewDocumentModel: function(model){
			var documentContentView = new DocumentContentView({
				model: model
			});
			this.showChildView('mainContent', documentContentView);
			Backbone.history.navigate('/doc/' + model.id);
		},
		scroll: function(event){
			var docListRegion = this.getRegion('docList');
			var el = docListRegion.$el;
			if (el.scrollTop() + el.innerHeight() >= el[0].scrollHeight){
				this.documentListView.loadMore();
			}
		},
		searchFile: function(event){
			var self = this;
			var query = this.$el.find("#search-bar").val();
			clearTimeout(this.searchKeyTimeoutHandler);
			this.searchKeyTimeoutHandler = setTimeout(function(){
				self.documentListView.searchFile(query);
			}, 400);
		}
	})
})
