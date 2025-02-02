from typing import Any
import requests
import ollama

from deepseek import DeepSeekModel
from duckSearch import DuckDuckGoAPI

class Generator:

    @staticmethod
    def generateSyllabus(self, course_title, credits, department):
        """
        Combine information from DuckDuckGo and DeepSeek to generate a syllabus.
        """
        # Fetch additional information from DuckDuckGo related to the course
        #abstract_info = DuckDuckGoAPI.get_info(course_title)
        abstract_info = "This is a Rutgers Course"

        if abstract_info:
            # Generate syllabus using DeepSeek
            syllabus = DeepSeekModel.generate_syllabus(course_title, credits, department, "")

            if syllabus:
                # Output the results
                print(f"Generated syllabus for '{course_title}':\n")
                print(syllabus)
            else:
                print("Failed to generate syllabus.")
        else:
            print("Failed to fetch course information from DuckDuckGo.")

"""def main():
    syllabus_generator = Generator()

    course_title = input("Enter the course title: ")
    credits = input("Credits: ")
    department = input("Department: ")

    syllabus_generator.generateSyllabus(course_title, credits, department)

if __name__ == "__main__":
    main()"""


