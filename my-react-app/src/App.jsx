import React, { useState } from "react";
import MainContent from "./components/MainContent";
import Chatbot from "./components/Chatbot";
import SideBar from "./components/Sidebar";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState(null); // Store fetched course data

  console.log("SelectedCourse:", selectedCourse);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const updateMessage = () => {
    const storedValue = localStorage.getItem("selectedCourse");
    document.getElementById("main_header").textContent = storedValue || "Course X";
  };

  window.addEventListener("storage", updateMessage);

  const onCourseSelect = async (selectedCourseId) => {
    try {
        const response = await fetch(`http://localhost:3000/get-content/${selectedCourseId}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Fetched content:", data);
            setCourseData(data); // Send to MainContent
        } else {
            console.error("Error fetching content:", response.statusText);
        }
    } catch (err) {
        console.error("Network error:", err);
    }
};


  return (
    <div style={styles.container}>
      {/* Sidebar (Left Column - Takes 3/12 width) */}
      <div style={styles.leftColumn}>
        <h2>Course Catalog</h2>
        <SideBar onCourseSelect={onCourseSelect} />
      </div>

      {/* Main Content (Middle Column - Takes 6/12 width) */}
      <div style={styles.middleColumn}>
        <MainContent selectedCourse={selectedCourse} courseData={courseData} />
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
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    padding: "10px",
    overflow: "hidden",
  },
  leftColumn: {
    position: "fixed",
    flex: 3,
    left:"0",
    top:"0",
    backgroundColor: "#e6f7ff",
    paddingLeft: "15px",
    height: "100vh",
    overflowY: "auto",
    width: "15vw",
    borderRadius: "8px",

  },
  middleColumn: {
    flex: 6,
    backgroundColor: "#ffffff",
    padding: "10px",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    color: "#333",
  },
  rightColumn: {
    position: "fixed",
    top: "0px",
    right: "0px",
    flex: 3,
    backgroundColor: "#e6f7ff",
    padding: "10px",
    height: "100vh",
    width: "25vw",
    borderRadius: "8px"
  
  },
};
