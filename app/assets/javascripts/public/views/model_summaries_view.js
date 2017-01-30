define(['backbone.marionette',
	'public/views/model_summary_view',
	'public/collections/summaries'],
	function(Marionette, ModelSummaryView, SummaryCollection){
	return Marionette.CollectionView.extend({
		childView: ModelSummaryView,
		onBeforeRender: function(){
			this.collection = new SummaryCollection(this.model.get('custom_summaries'));
		}
	})
})