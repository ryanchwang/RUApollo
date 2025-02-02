import React from 'react';

const MainContent = ({ selectedCourse, courseData }) => {
  if (!courseData) {
    return <div>Please select a course to view its details.</div>;
  }
  const content = courseData.content || ["Content will be generated soon..."];

  return (
    <div style={styles.thingy}>
      <p><strong>Course Title:</strong> {courseData.courseTitle}</p>
      <p><strong>Course Credit:</strong> {courseData.courseCredit}</p>
      <p><strong>Prerequisites:</strong> {courseData.prereqs}</p>
      <p>Content:</p>
      <p>{content}</p>
    </div>

  );
};

const styles = {
  thingy: {
    width: "40vw",
    height: "100vh",
    padding: "10px",
    overflowY: "auto",
    paddingRight: "10vw",
    marginLeft: "-5vw"
  }}

export default MainContent;