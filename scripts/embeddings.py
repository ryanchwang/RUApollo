from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np
from pymongo import MongoClient


# Function to generate embedding for a course content
def generate_embedding(course_content):
    result = subprocess.run(
        ["ollama", "generate", "--model", "granite-embedding", "--text", course_content],
        capture_output=True, text=True
    )
    embedding = result.stdout.strip().split()  # assuming the result is a space-separated array of numbers
    return np.array(embedding, dtype=np.float32)  # Convert to numpy array for easier handling

# MongoDB connection
uri = "mongodb+srv://ryanchwang:aO0oL36ytNgOpNyH@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
client = MongoClient(uri)
db = client["Subjects_Embedding"]
collections = db.list_collection_names()

# Function to insert courses with embeddings
def insert_courses_with_embeddings(courses):
    for course in courses:
        embedding = generate_embedding(course["content"])
        db["courses"].insert_one({
            "course_id": course["courseID"],
            "course_title": course["courseTitle"],
            "course_creds": course["courseCredit"],
            "course_prereqs": course["prereqs"],
            "content": course["content"],
            "content_embedding": embedding.tolist()  # Store the embedding as a list in MongoDB
        })

# Insert courses with embeddings

for collection_name in collections:
        collection = db[collection_name]

        insert_courses_with_embeddings(collection.find())