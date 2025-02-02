from typing import List
import requests
import ollama

class DeepSeekModel:

    @staticmethod
    def generate_syllabus(course_title, abstract_info):
        """
        Use DeepSeek-R1 model to generate a syllabus based on course title and abstract info.
        """

        my_model = "deepseek-r1:1.5B"
        my_prompt = f"Generate a syllabus for a Rutgers course titled '{course_title}'. Here's some background information: {abstract_info}"
        
        try:
            # Interact with the DeepSeek-R1 model via Ollama
            answer = ollama.generate(model=my_model, prompt=my_prompt)
            return answer
        except Exception as e:
            print(f"Error generating syllabus with DeepSeek: {e}")
            return None
        

print(DeepSeekModel.generate_syllabus("math", "at rutgers"))