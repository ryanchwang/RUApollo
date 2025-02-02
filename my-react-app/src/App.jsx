import React, { useState } from "react";
import MainContent from "./components/MainContent";
import Chatbot from "./components/Chatbot";
import SideBar from "./components/Sidebar";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  console.log("SelectedCourse:", selectedCourse);
  const handleCourseSelect = (course) => {
    console.log("Selected course:", course);
    setSelectedCourse(course);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar (Left Column - Takes 3/12 width) */}
      <div style={styles.leftColumn}>
        <h2>Course Catalog</h2>
        <SideBar onCourseSelect={handleCourseSelect} />
      </div>

      {/* Main Content (Middle Column - Takes 6/12 width) */}
      <div style={styles.middleColumn}>
        <MainContent selectedCourse={selectedCourse} />
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
    height: "100vh",              // Full viewport height
    padding: "10px",
    overflow: "hidden",           // Prevent overflow from fixed positioning
  },
  leftColumn: {
    flex: 3,                      // Takes 3/12 width
    backgroundColor: "#f3f3f3",   // Sidebar color
    padding: "10px",
    height: "95vh",               // Full height except some padding
    overflowY: "auto",            // Allows scrolling if content overflows
  },
  middleColumn: {
    flex: 6,                      // Takes 6/12 width
    backgroundColor: "white",     // Main content color
    padding: "10px",
    height: "95vh",               // Ensures the content height is adjusted to match sidebar and chatbot
    display: "flex",
    justifyContent: "center",      // Centers content horizontally
    alignItems: "center",          // Centers content vertically
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
