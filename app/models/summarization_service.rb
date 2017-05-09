require 'tempfile'

class SummarizationService
	def summarize(text)
		# write to temp file
		file = Tempfile.new('inputdoc')
		file.write(text)
		file.close

		# convert to anynomous entities
		new_text = self.remove_entities(file.path)

		file = Tempfile.new('processed_doc')
		file.write("Test title \n\n")
		file.write(new_text)
		file.write("\n\nTest summary\n\nTest_meta")
		file.close

		print new_text

		# call the summarization model
		summary = self.call_summarization_model(file.path)

		return summary
	end

	def remove_entities(file_path)
		cmd = "cd ~/thesis/stanford_ner/stanford-ner-2016-10-31 && ./ner.sh " + file_path
		output = `#{cmd}`

		output_tokens = []
		entity_count = 0
		prev_ner = "xxx"

		tokens = output.split(" ")
		tokens.each do |token|
			word, ner = token.split("/")
			if ner != "O"
				if prev_ner == ner
					next
				else
					output_tokens << "@entity#{entity_count}"
					entity_count += 1
				end
			else
				output_tokens << word
			end
			prev_ner = ner
		end

		sentences = output_tokens.join(" ").split(".")

		new_sentences = sentences.map do |s|
			s.strip() + "\t\t\t" + "0"
		end

		return new_sentences.join("\n")
	end

	def call_summarization_model(file_path)
		cmd = "cd ~/thesis/textsum-cnn/ && python main_cnn.py --model_dir checkpoint/seq2seq_32_abs --mode decode --model seq2seq --bs_mode group --ranker docrel --beam_size 10 --num_beam_group 10 --input_file #{file_path} --local_diversity --local_diversity_rate 2.0 --diversity"

		output = `#{cmd}`

		return output
	end
end