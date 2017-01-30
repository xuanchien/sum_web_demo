define(['backbone.marionette'], function(Marionette){
	return Marionette.View.extend({
		template: JST['public/templates/model_summary'],
		className: 'system-section'
	});
})