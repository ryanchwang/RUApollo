import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time

df = pd.read_csv('subjects.csv', dtype = str)
n = len(df)

courses = []

for i in n:

    scode = df["code"].iloc[i].strip()
    driver = webdriver.Chrome()
    url = f'https://classes.rutgers.edu/soc/#courses?subject={scode}&semester=12025&campus=NB&level=U'
    response = driver.get(url)
    time.sleep(3)
    html_content = driver.page_source

    soup = BeautifulSoup(html_content, 'html.parser')

    course_data = []

    # Find all course IDs and Titles
    courseID_elements = soup.find_all(class_='courseId')
    courseTitle_elements = soup.find_all(class_='courseTitle')
    courseCredit_elements = soup.find_all(class_='courseCredits')
    
    for courseID, courseTitle, courseCredit in zip(courseID_elements, courseTitle_elements, courseCredit_elements):
        course_data.append({
            'courseID': courseID.text.strip(),
            'courseTitle': courseTitle.text.strip(),
            'courseCredit': courseCredit.text.strip()
        })
    
    # Append this data for the current row
    if course_data: courses.append(course_data)

    driver.quit()


print(courses)


