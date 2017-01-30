define(['backbone.marionette'], function(Marionette){
	return Marionette.View.extend({
		template: JST['public/templates/document_item'],
		triggers: {
			'click a': 'select:item'
		},
		tagName: 'li',
		getContext: function(){
			return {
				name: this.model.id
			}
		},
		render: function(){
			this.$el.html(this.template(this.getContext()));
			return this;
		}
	})
})