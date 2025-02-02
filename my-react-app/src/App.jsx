import React from "react";
import MainContent from "./components/MainContent";
import Chatbot from "./components/Chatbot";
import LeftBar from "./components/Sidebar";

export default function App() {
  return (
    <div style={styles.container}>
      {/* Sidebar (Left Column - Takes 3/12 width) */}
      <div style={styles.leftColumn}>
        <h2>Course Catalog</h2>
        <LeftBar />
      </div>

      {/* Main Content (Middle Column - Takes 6/12 width) */}
      <div style={styles.middleColumn}>
        <MainContent />
      </div>

      {/* Chatbot (Right Column - Takes 3/12 width) */}
      <div style={styles.rightColumn}>
        <Chatbot />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",              // Use flexbox layout
    flexDirection: "row",         // Align children horizontally (left, center, right columns)
    height: "100%",              // Full viewport height
    padding: "10px",
  },
  leftColumn: {
    flex: 2,                      // Takes 3/12 width
    backgroundColor: "#f3f3f3",   // Sidebar color
    padding: "10px",
    position: "fixed",
    overflowY: "auto",
    width: "15vw",
    height: "95vh"
  },
  middleColumn: {
    flex: 7,                      // Takes 6/12 width
    backgroundColor: "white",     // Main content color
    padding: "10px",
  },
  rightColumn: {
    position: "fixed",
    top: "15px",                        // Stick to the top
    right: "15px",
    flex: 3,                      // Takes 3/12 width
    backgroundColor: "#e6f7ff",   // Chatbot color
    padding: "10px",
    height: "95vh",
    width: "15vw",
  },
};
