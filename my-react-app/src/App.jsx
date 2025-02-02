import React from "react";
import MainContent from "./components/MainContent";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="grid grid-cols-12 h-screen p-4 gap-4">
      {/* Sidebar (Left Column - Takes 2/12 width) */}
      <div className="col-span-2 bg-gray-100 p-4">
        <h2 className="text-lg font-bold">Sidebar</h2>
        {/* Add sidebar content here */}
      </div>

      {/* Main Content (Middle Column - Takes 4/12 width) */}
      <div className="col-span-4 bg-white p-4">
        <MainContent />
      </div>

      {/* Chatbot (Right Column - Takes 6/12 width, the largest) */}
      <div className="col-span-6 bg-blue-50 p-4">
        <Chatbot />
      </div>
    </div>
  );
}
