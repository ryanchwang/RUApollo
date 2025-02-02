import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Chatbot from "./components/Chatbot";

const courses = [
  { code: "CS101", name: "Introduction to Computer Science" },
  { code: "CS202", name: "Data Structures & Algorithms" },
  { code: "CS303", name: "Machine Learning" },
];

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].code);

  return (
    <div className="grid grid-cols-12 h-screen p-4 gap-4">
      {/* Sidebar (Left Column) */}
      <Sidebar selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} courses={courses} />

      {/* Main Content (Middle Column) */}
      <MainContent selectedCourse={selectedCourse} courses={courses} />

      {/* Chatbot (Right Column) */}
      <Chatbot />
    </div>
  );
}
