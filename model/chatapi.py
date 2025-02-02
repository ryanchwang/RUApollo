from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import numpy as np
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB connection setup
uri = "mongodb+srv://ryanchwang:aO0oL36ytNgOpNyH@apollo.nsr4b.mongodb.net/?retryWrites=true&w=majority&appName=Apollo"
client = MongoClient(uri, tlsAllowInvalidCertificates=True)
db = client["Subjects_Embedding"]  # Database with courses and embeddings

# Initialize the Ollama model
model1 = "granite-embedding"
model2 = "tinyllama"

# Function to generate embedding for a course content or user query
def generate_embedding(content):
    response = ollama.embeddings(model=model1, prompt=content)
    return np.array(response["embedding"], dtype=np.float32)  # Convert to numpy array

# Function to perform vector search in MongoDB
def vector_search(query_text, num_candidates=5):
    query_embedding = generate_embedding(query_text)  # Generate embedding for query
    
    results = db["courses"].aggregate([
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "content_embedding",
                "queryVector": query_embedding.tolist(),
                "numCandidates": num_candidates
            }
        }
    ])
    
    return list(results)  # Convert cursor to list

# Chatbot messages history
messages = [
    {"role": "system", "content": "You are a helpful course advisor. Answer concisely and recommend relevant courses."},
]

@app.route("/chat_initial", methods=["POST"])
def init_chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    messages.append({"role": "user", "content": user_message})

    try:
        response = ollama.chat(model=model2, messages=messages)  # Correct Ollama API usage
        bot_response = response["message"]["content"]

        messages.append({"role": "assistant", "content": bot_response})

        return jsonify({"response": bot_response})
    
    except Exception as e:
        print(str(e))
        return jsonify({"error": f"Error generating response: {str(e)}"}), 500

@app.route("/chat_continue", methods=["POST"])
def con_chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    messages.append({"role": "user", "content": user_message})

    try:
        search_results = vector_search(user_message)
        suggested_courses = [course.get('course_title', 'Unknown Course') for course in search_results]

        response = ollama.chat(model=model2, messages=messages)
        bot_response = response["message"]["content"]

        bot_response += "\nSuggested courses:\n" + "\n".join(suggested_courses)

        messages.append({"role": "assistant", "content": bot_response})

        return jsonify({"response": bot_response})

    except Exception as e:
        print(str(e))
        return jsonify({"error": f"Error generating response: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
