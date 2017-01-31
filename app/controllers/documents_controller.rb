class DocumentsController < ApplicationController
  def index
  	page = params[:page] ? params[:page].to_i : 0
    per_page = params[:per_page] ? params[:per_page].to_i : 20
  	@docs = document_service.get_documents(page, per_page, params[:query])
  end

  def show
  	@doc = document_service.get_doc_details(params[:id])
  	render :json => @doc
  end

  private
  def document_service
  	@document_service ||= DocumentService.new
  end
end
