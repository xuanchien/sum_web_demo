define(['backbone'], function(Backbone){
	return Backbone.Model.extend({
		defaults: {
			model_name: "",
			content: "N/A"
		}
	})
});