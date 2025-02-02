import Dropdown from "./Dropdown";
import React, { useState, useEffect } from 'react';


export default function LeftBar() {
  const [courseData, setCourseData] = useState([]);

  // Fetch the collection names and course titles
  const fetchCourseTitles = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/course-titles");
      if (response.ok) {
        const data = await response.json();
        setCourseData(data); // Store data in state
      } else {
        console.error("Error fetching course titles:", response.statusText);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  useEffect(() => {
    fetchCourseTitles(); // Fetch course titles when component mounts
  }, []);

  return (
    <div>
      {courseData.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        courseData.map((item, index) => (
          <div key={index}>
            <Dropdown
              id={item.collectionName}
              options={item.courseTitles}
              text={item.collectionName}
            />
          </div>
        ))
      )}
    </div>
  );
};