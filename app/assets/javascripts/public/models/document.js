define(['backbone'], function(Backbone){
	return Backbone.Model.extend({
		defaults: {
			id: null,
			path: null,
			content: null,
			gold_summary: null
		},
		initialize: function(){
			if (this.id == null){
				this.set('id', this.getId());
			}
		},
		url: function(){
			return '/documents/' + this.id;
		},
		getId: function(){
			var parts = this.attributes.path.split("/");
			return parts[parts.length-1];
		}
	})
})