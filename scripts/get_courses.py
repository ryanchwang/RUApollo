import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

df = pd.read_csv('data/subjects.csv', dtype = str)
print(df)
n = len(df)

uri = "mongodb+srv://am3567:PLerxKuO7NieHTs9@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
subjects = client["Subjects"]

options = webdriver.ChromeOptions()
options.add_argument('--headless')

for i in range(n):

    #scode = subject code
    scode = df["code"].iloc[i].strip()
    driver = webdriver.Chrome(options = options)
    url = f'https://classes.rutgers.edu/soc/#courses?subject={scode}&semester=12025&campus=NB&level=U'
    response = driver.get(url)
    time.sleep(.75)
    html_content = driver.page_source

    soup = BeautifulSoup(html_content, 'html.parser')

    course_data = []

    # Find all course IDs and Titles
    courseID_elements = soup.find_all(class_='courseId')
    courseTitle_elements = soup.find_all(class_='courseTitle')
    courseCredit_elements = soup.find_all(class_='courseCredits')
    
    for courseID, courseTitle, courseCredit in zip(courseID_elements, courseTitle_elements, courseCredit_elements):
        prereqs = driver.execute_script(f"return TooltipUtils.getPrereqTooltipContent(\"{courseID.text.strip()}.{i}.prereq\");")
        if prereqs:
            prereqs = BeautifulSoup(prereqs, "html.parser")
            prereqs = prereqs.text.strip()
        else:
            prereqs = ""

        #input courses for valid subjects
        course_data.append({
            'courseID': courseID.text.strip(),
            'courseTitle': courseTitle.text.strip(),
            'courseCredit': courseCredit.text.strip(),
            "prereqs": prereqs
        })

    if course_data:
        subjects[scode + " - " + df["description"].iloc[i].strip()].insert_many(course_data)

    driver.quit()