define(['backbone.marionette',
	'public/collections/documents',
	'public/views/document_item_view'],
	function(Marionette, DocumentCollection, DocumentItemView){
	return Marionette.CollectionView.extend({
		collection: new DocumentCollection(),
		childView: DocumentItemView,
		id: 'doc-list',
		tagName: 'ul',
		childViewTriggers: {
			'select:item': 'child:click'
		},
		onRender: function(){
			this.collection.fetch();
		}
	})
})