define(['backbone', 'public/models/summary'], function(Backbone, SummaryModel){
	return Backbone.Collection.extend({
		model: SummaryModel
	})
});