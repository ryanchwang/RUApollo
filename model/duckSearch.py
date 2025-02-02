import requests
import ollama

class DuckDuckGoAPI:

    @staticmethod
    def get_info(course_title):
        """
        Fetch information from DuckDuckGo related to the course title.
        """
        base_url = 'https://duckduckgo.com/'
        params = {
            'q': "Rutgers course " + course_title,  # You can add 'site:rutgers.edu' to restrict to Rutgers-related info
            'format': 'json',
            'no_html': 1,
            'no_redirect': 1,
        }

        print(params)

        try:
            #response = requests.get(base_url, params=params)
            response = requests.get(f"https://api.duckduckgo.com/?q=rutgers&format=json")
            response.raise_for_status()  # Raise an error for bad status codes
            print(response.json())
            data = response.json()

            # Extract relevant information from the response
            abstract = data.get('Abstract', 'No abstract available')
            return abstract
        except requests.RequestException as e:
            print(f"Error fetching data from DuckDuckGo: {e}")
            return None