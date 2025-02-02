import Dropdown from "./Dropdown";
import React, { useState, useEffect } from 'react';


export default function SideBar({onCourseSelect}) {
  const [courseData, setCourseData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown

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

  // Define the onCourseSelect function
  const onCourseSelectdd = (selectedCourse) => {
    if (onCourseSelect){
      onCourseSelect(selectedCourse)
    }
    console.log("Course selected:", selectedCourse);
    // You can add further logic here, such as setting the selected course in the state
  };

  return (
    <div>
      {courseData.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        courseData.map((item, index) => (
          <div key={index}>
            <Dropdown
              id={item.collectionName}
              options={item.courses}
              text={item.collectionName}
              onSelect={onCourseSelectdd} // Ensure onSelect is passed
              setActiveDropdown={setActiveDropdown} // Fix setActiveDropdown issue
            />
          </div>
        ))
      )}
    </div>
  );
};