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
from deepseekcli import DeepSeekModel

# MongoDB URI and connection
#uri = "mongodb+srv://ryanchwang:aO0oL36ytNgOpNyH@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
uri = "mongodb+srv://ryanchwang:aO0oL36ytNgOpNyH@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
client = MongoClient(uri, tlsAllowInvalidCertificates=True)

db = client["Subjects_Copy"]
collections = db.list_collection_names()[1:]

def create_course_desc_and_outline(collection_name, stuff_in_collection):
    for course in stuff_in_collection:
        if "content" in course:
            continue
        course_id = course["courseID"]
        course_title = course["courseTitle"]
        course_creds = course["courseCredit"]
        course_prereqs = course["prereqs"]
        
        content = DeepSeekModel.generate_syllabus(course_id, course_title, course_creds, collection_name, course_prereqs)

        db[collection_name].update_one({"_id": course["_id"]}, {"$push": {"content": content}})

        print(collection_name, course_title, "done!")

# Main async function to handle concurrent scraping and MongoDB insertions
def main():
    # ThreadPoolExecutor for concurrent scraping
    with ThreadPoolExecutor(max_workers=5) as executor:
        # Create a pool of WebDriver instances
        futures = []

        # Iterate through each collection and perform some operation
        for collection_name in collections:
            collection = db[collection_name]  # Access the collection

            print("starting collection", collection_name)
            create_course_desc_and_outline(collection_name, collection.find())

# Run the async main function
main()