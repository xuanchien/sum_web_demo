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
		initialize: function(){
			this.page = 0;
			this.per_page = 20;
			this.loadMore();
		},
		loadMore: function(){
			this.page += 1;
			this.collection.fetch({
				update: true,
				remove: false,
				data: {
					page: this.page,
					per_page: this.per_page
				}
			});
		},
		onChildClick: function(childView){
			this.$el.find('li').removeClass('selected');
			childView.$el.addClass('selected');
		}
	})
})