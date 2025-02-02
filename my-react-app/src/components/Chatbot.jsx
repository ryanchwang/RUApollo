import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I help?" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input }]);
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
          <p key={msg.id}>{msg.text}</p>
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
  container: { 
    display: "flex", 
    flexDirection: "column", 
    height: "100vh",  // ✅ Change from "100vh" to "100%"
    padding: 10 
  },
  title: { flex: 1, textAlign: "center", fontSize: "20px", fontWeight: "bold", padding: "10px 0" },
  history: { flex: 8, border: "1px solid #ccc", padding: 10, overflowY: "auto" },
  inputContainer: { flex: 1, display: "flex", gap: 5, paddingTop: 10 },
  input: { flex: 1, padding: 5, border: "1px solid #ccc" },
};

export default Chatbot;
