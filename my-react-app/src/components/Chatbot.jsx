import React, { useState } from "react";

const Chatbot = () => {
  // Initial messages with user and chatbot
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help?", author: "Chatbot" },
  ]);
  const [input, setInput] = useState("");

  // Function to fetch response from Flask backend
  async function sendMessageToLLM(userMessage) {
    try {
      console.log("tried to send")
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      return data.response;  // The response from the Flask API
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, something went wrong.";
    }
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

  // Handle the "Enter" key press for submitting the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      sendMessage();
    }
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
          onKeyDown={handleKeyDown} // Add the event handler for "Enter" key
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
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
  },
};

export default Chatbot;
