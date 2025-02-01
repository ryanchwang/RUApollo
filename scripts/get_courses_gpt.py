import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from concurrent.futures import ThreadPoolExecutor
import time

# Load the subjects CSV
df = pd.read_csv('data/subjects.csv', dtype=str)
n = len(df)

# MongoDB URI and connection
uri = "mongodb+srv://am3567:PLerxKuO7NieHTs9@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
client = AsyncIOMotorClient(uri)

# Async MongoDB client function
async def insert_course_data(scode, course_data, i):
    db = client["Subjects"]
    if course_data:
        collection = db[scode + " - " + df["description"].iloc[i].strip()]
        await collection.insert_many(course_data)

# Initialize the WebDriver for Chrome
def init_driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    return webdriver.Chrome(options=options)

# Scraping function for each subject
def scrape_data_for_subject(i, scode):
    url = f'https://classes.rutgers.edu/soc/#courses?subject={scode}&semester=12025&campus=NB&level=U'
    driver = init_driver()
    driver.get(url)

    # Wait for the courseId elements to load
    try:
        WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, 'courseId')))
    except:
        print(scode, "failed!")
        driver.quit()
        return scode, [], i
    
    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'html.parser')

    course_data = []

    # Find all course IDs, titles, and credits
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

        course_data.append({
            'courseID': courseID.text.strip(),
            'courseTitle': courseTitle.text.strip(),
            'courseCredit': courseCredit.text.strip(),
            "prereqs": prereqs
        })

    print(scode, "success!")
    driver.quit()
    return scode, course_data, i

# Main async function to handle concurrent scraping and MongoDB insertions
async def main():
    # ThreadPoolExecutor for concurrent scraping
    with ThreadPoolExecutor(max_workers=5) as executor:
        # Create a pool of WebDriver instances
        futures = []

        # Submit scraping tasks for each subject
        for i in range(n):
            scode = df["code"].iloc[i].strip()
            futures.append(executor.submit(scrape_data_for_subject, i, scode))

        # Wait for all scraping tasks to complete
        for future in futures:
            scode, course_data, i = future.result()

            # Insert the scraped data into MongoDB
            await insert_course_data(scode, course_data, i)

# Run the async main function
asyncio.run(main())