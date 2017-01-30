define(['backbone.marionette',
	'public/views/document_list_view',
	'public/views/empty_document_content_view',
	'public/views/document_content_view'],
	function(Marionette, DocumentListView, EmptyDocumentContentView, DocumentContentView){
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
		onRender: function(){
			this.showChildView('docList', new DocumentListView());
			this.showChildView('mainContent', new EmptyDocumentContentView());
		},
		showDocumentContent: function(childView){
			var documentContentView = new DocumentContentView({
				model: childView.model
			});
			this.showChildView('mainContent', documentContentView);
		}
	})
})
