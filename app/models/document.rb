class Document
	attr_accessor :path, :content, :gold_summary, :custom_summaries
	def initialize(path, content, gold_summary)
		@path = path
		@content = content
		@gold_summary = gold_summary
	end
end