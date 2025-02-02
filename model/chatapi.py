from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import ollama

app = Flask(__name__)
CORS(app)

# Initialize the Ollama chat model once when the server starts

messages = [{"role": "user", "content": "You are a knowledgeable and concise personal course counselor, helping students choose their courses and guiding them through their academic journey. You should: Provide clear and informative course details in response to student inquiries, covering course content, prerequisites, credits, and any relevant connections to other courses or majors. Be able to suggest related courses based on the student's current interests or academic goals. Offer concise yet thorough explanations when asked about the course material, structure, or how it fits into a larger academic or career context. Suggest appropriate courses, minors, or majors if the student asks for guidance, using their preferences and interests to personalize the recommendations. Ensure responses are easy to understand and relevant to the student's academic path or goals. Be mindful of providing options, alternatives, and connections between different courses or fields of study as they come up. Always maintain a tone that is professional, friendly, and helpful. Limit responses to 2 sentences."},
            {"role": "assistant", "content": "Ok I will do my best! What is your first messaage?"}]

model = "tinyllama:latest"

@app.route("/chat_initial", methods=["POST"])
def init_chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    messages = [{"role": "user", "content": "You're an efficient personal course counselor. Your goal is to provide concise, informative answers in two sentences, covering course details and possible connections between courses. Feel free to suggest other relevant courses based on the student's interests and goals."},
                {"role": "assistant", "content": "Ok I will do my best! What is your first messaage?"},
                {"role": "user", "content": user_message}]
    
    print(messages)
    try:
        # Use Ollama's chat method to get a response
        bot_response = ollama.chat(model, messages).message.content
        messages.append({"role": "assistant", "content": bot_response})
        print(messages)
        
        return jsonify({"response": bot_response})
    
    except Exception as e:
        return jsonify({"error": f"Error generating response: {str(e)}"}), 500
    
@app.route("/chat_continue", methods=["POST"])
def con_chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    messages.append({"role": "user", "content": user_message})
    print(messages)
    try:
        # Use Ollama's chat method to get a response
        bot_response = ollama.chat(model, messages).message.content
        messages.append({"role": "assistant", "content": bot_response})
        
        return jsonify({"response": bot_response})
    
    except Exception as e:
        print(str(e))
        return jsonify({"error": f"Error generating response: {str(e)}"}), 500
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
