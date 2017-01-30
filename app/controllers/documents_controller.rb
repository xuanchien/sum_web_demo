class DocumentsController < ApplicationController
  def index
  	@docs = document_service.get_documents
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
