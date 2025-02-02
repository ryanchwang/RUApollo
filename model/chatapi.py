from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import ollama

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the Ollama chat model once when the server starts
llm = ollama.Chat()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Use Ollama's chat method to get a response
        bot_response = llm.chat(user_message)
        
        return jsonify({"response": bot_response})
    
    except Exception as e:
        return jsonify({"error": f"Error generating response: {str(e)}"}), 500
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
