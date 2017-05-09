class HomeController < ApplicationController
	skip_before_action :verify_authenticity_token, only: [:summarize]
  def index
  end

  def about
  end

  def online
  	render layout: "custom_layout"
  end

  def summarize
  	text = params[:text]

  	output = SummarizationService.new.summarize(text)
  	render :plain => text
  end
end
