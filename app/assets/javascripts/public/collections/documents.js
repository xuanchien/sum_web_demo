define(['backbone', 'public/models/document'], function(Backbone, Document){
	return Backbone.Collection.extend({
		url: '/documents',
		model: Document,
		parse: function(data){
			return data.documents;
		}
	})
})