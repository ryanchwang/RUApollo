import subprocess
import ollama
import time

class DeepSeekModel:

    @staticmethod
    def generate_syllabus(course_id, course_title, credits, department, prereqs):
        """
        Use DeepSeek-R1 model to generate a syllabus based on course title and abstract info.
        """
        my_model = "tinyllama:latest"
        my_prompt = f"""
                        I would like you to generate a detailed course description and outline for {course_id}: a {course_title} course with {credits} from the {department} department.
                        The prerequisites are {prereqs}.
                        Please do not create any additional information beyond what is specified.
                        Omit anything not provided or uncertain.
                        Do not write anything before or after the course description and 15-week curriculum, do not include an intro or conclusion.
                        The course description should come before the curriculum, and you must be organized based exactly on what you have been told.
                        Understand all directions before proceeding.

                        1. Course Description:

                        Include the course name, id, department, and any prereqs in the first /sentence.
                        If there are no prereqs, do not mention them anywhere in your response.
                        Begin with a brief, engaging introduction to the course, highlighting its importance and applications.
                        Focus on the real-world relevance of the course and what skills students will gain.
                        Keep the description brief and exciting.
                        Should be 3-5 sentences and comprehensive.
                        Format this as a short paragrabh blurb that can be quickly read and understood.

                        2. Week-by-Week Curriculum (15 Weeks):

                        Provide a sample curriculum for 15 weeks only, do not do less or more.
                        Each week should include a specific topic or focus, one brief sentence maximum.
                        Give topics for the whole week, not individual days.
                        Be sure to indicate the learning objectives for each week (what students should learn by the end of the week).
                        Do not invent any fictional content beyond the outline; it should be realistic and based on typical course structures.
                        Make sure the tone remains exciting, and the course outline is applicable to real-world use cases of the subject.
                        Format this as a list with week numbers as headers and a two bullet points per week, one for the topic and one for the learning objective.
                        
                    """.replace("\n", "")
        
        try:
            # Interact with the DeepSeek-R1 model via Ollama
            subprocess.run(["ollama", "stop", my_model])
            response = subprocess.run(["ollama", "run", my_model, my_prompt], capture_output=True, text=True, check=True)
            
            return response.stdout
        except Exception as e:
            print(f"Error generating syllabus with Ollama: {e}")
            return None
        
