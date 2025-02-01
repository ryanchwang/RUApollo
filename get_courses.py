import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time

driver = webdriver.Chrome()

df = pd.read_csv('subjects.csv')
n = len(df)

print(df)

courses = []

for i in range(5):

    print(i)

    scode = df["code"].iloc[i]

    url = f'https://classes.rutgers.edu/soc/#courses?subject={scode}&semester=12025&campus=NB&level=U'
    response = driver.get(url)
    time.sleep(10)
    html_content = driver.page_source

    soup = BeautifulSoup(html_content, 'html.parser')

    course_data = []

    # Find all course IDs and Titles
    courseID_elements = soup.find_all(class_='courseID')
    courseTitle_elements = soup.find_all(class_='courseTitle')
    
    for courseID, courseTitle in zip(courseID_elements, courseTitle_elements):
        course_data.append({
            'courseID': courseID.text.strip(),
            'courseTitle': courseTitle.text.strip()
        })
    
    # Append this data for the current row
    courses.append(course_data)

print(courses)


