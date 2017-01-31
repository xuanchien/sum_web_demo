class DocumentService
	DOC_FOLDER = ""
	SYSTEMS_FOLDER = ""

	def initialize
		@config = YAML::load(File.open(File.join(Rails.root, "config/data.yml")))[Rails.env]
		@doc_folder = @config["gold_folder"]
		@systems_folder = @config["system_folder"]
	end

	def get_documents(page, per_page, query)
		docs = []
		files = Dir.glob(File.join(@doc_folder, "*.summary"))

		if query
			puts query
			files = files.select{|x| x.split("/").last.include?(query)}
			puts files
		end

		puts page
		puts per_page

		files[page, page+per_page].each do |file|
			puts file
			body, summary = read_article_file_content(file)
			docs << Document.new(file, body, summary)
		end

		docs
	end

	def read_article_file_content(file_path)
		body = ""
		summary = ""

		content = File.open(file_path, "r").read()
		_, body, summary, _ = content.force_encoding("iso-8859-1").split("\n\n")
		body = body.gsub(/\t\t\t\d/, "")

		[body, summary]
	end

	def read_summaries(file_id)
		model_summaries = []

		model_folders = Dir.glob(File.join(@systems_folder, "*")).select{|f| File.directory?(f)}

		model_folders.each do |model_path|
			path = File.join(model_path, "#{file_id}.summary")
			model_name = File.basename(model_path)
			if File.exists?(path)
				model_summaries << {
					model_name: model_name,
					content: File.open(path, "r").read
				}
			end
		end

		model_summaries
	end

	def get_doc_details(file_id)
		original_file_path = File.join(@doc_folder, "#{file_id}.summary")
		body, summary = read_article_file_content(original_file_path)

		doc = Document.new(original_file_path, body, summary)
		doc.custom_summaries = read_summaries(file_id)

		doc
	end
end