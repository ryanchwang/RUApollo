import React from 'react';

const MainContent = ({ selectedCourse }) => {
  if (!selectedCourse) {
    return <div>Please select a course to view its details.</div>;
  }

  return (
    <div>
      <h1>{selectedCourse.label}</h1>
      <p><strong>Course Title:</strong> {selectedCourse.title}</p>
      <p><strong>Course Credit:</strong> {selectedCourse.credit}</p>
      <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites}</p>
      <h2>Syllabus</h2>
      <ul>
        {selectedCourse.syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;