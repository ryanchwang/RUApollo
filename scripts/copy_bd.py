from pymongo import MongoClient

#uri = "mongodb+srv://am3567:PLerxKuO7NieHTs9@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
uri = "mongodb+srv://ryanchwang:aO0oL36ytNgOpNyH@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
client = MongoClient(uri)

source_db = client["Subjects"]
destination_db = client["Subjects_Copy"]

# Loop through collections and copy data
for collection_name in source_db.list_collection_names():
    source_collection = source_db[collection_name]
    destination_collection = destination_db[collection_name]

    # Fetch all documents and insert into the new database
    docs = list(source_collection.find())
    if docs:
        destination_collection.insert_many(docs)

print("Database cloned successfully!")