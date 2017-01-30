define(['backbone.marionette',
	'public/views/gold_summary_view',
	'public/views/model_summaries_view'],
	function(Marionette, GoldSummaryView, ModelSummariesView){
	return Marionette.View.extend({
		className: 'doc-content',
		regions: {
			goldSummaryRegion: '#gold-summary-section',
			otherMethodsRegion: '#other-systems-section'
		},
		template: JST['public/templates/document_content'],
		initialize: function(options){
			this.model.fetch().done(this.render);
		},
		onRender: function(){
			this.showChildView('goldSummaryRegion', new GoldSummaryView({model: this.model}));
			this.showChildView('otherMethodsRegion', new ModelSummariesView({model: this.model}));
		}
	})
});