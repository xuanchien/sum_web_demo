define(['backbone'], function(Backbone){
	return Backbone.Model.extend({
		defaults: {
			path: null,
			content: null,
			gold_summary: null
		},
		initialize: function(){
			this.set('id', this.id());
		},
		id: function(){
			var parts = this.attributes.path.split("/");
			return parts[parts.length-1];
		}
	})
})