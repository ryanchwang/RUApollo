import { useState } from "react";
import LeftBar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightBar from "./components/Chatbot";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].code);

  return (
    <div className="grid grid-cols-12 h-screen p-4 gap-4">
      {/* Sidebar (Left Column) */}
      <Sidebar />

      {/* Main Content (Middle Column) */}
      <MainContent />

      {/* Chatbot (Right Column) */}
      <Chatbot />
    </div>
  );
}
