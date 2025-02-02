import React, { useState } from "react";

const Chatbot = () => {
  // Initial messages with user and chatbot
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help?", author: "Chatbot" },
  ]);
  const [input, setInput] = useState("");

  // Function to fetch response from Flask backend
  async function sendMessageToLLM(userMessage) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await response.json();
    return data.response;  // The response from the Flask API
  }

  // Send message and get chatbot response
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    // Add user message to the chat
    const newMessages = [
      ...messages,
      { id: messages.length + 1, text: input, author: "User" },
    ];
    setMessages(newMessages);

    // Get chatbot response and add it to the chat
    const botResponse = await sendMessageToLLM(input);
    setMessages([
      ...newMessages,
      { id: messages.length + 2, text: botResponse, author: "Chatbot" },
    ]);

    // Clear input field
    setInput("");
  };

  return (
    <div style={styles.container}>
      {/* 1️⃣ Title Row */}
      <div style={styles.title}>
        <h2>Chat</h2>
      </div>

      {/* 2️⃣ Message History Row */}
      <div style={styles.history}>
        {messages.map((msg) => (
          <div key={msg.id} style={styles.messageRow}>
            <strong>{msg.author}:</strong> <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 3️⃣ Input Row */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const styles = {
<<<<<<< HEAD
  container: { 
    display: "flex", 
    flexDirection: "column", 
    height: "100%",  // ✅ Change from "100vh" to "100%"
    padding: 10 
=======
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px 0",
  },
  history: {
    flex: 8,
    border: "1px solid #ccc",
    padding: 10,
    overflowY: "auto",
  },
  messageRow: {
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    gap: 5,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    padding: 5,
    border: "1px solid #ccc",
>>>>>>> 7b26f8fedbc9c0186b0cec5aed11044de073bd0f
  },
};

export default Chatbot;
