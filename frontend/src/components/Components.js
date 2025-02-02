// components/CourseItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourseItem = ({ course }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.courseID}>Course ID: {course.courseID}</Text>
      <Text style={styles.courseTitle}>Title: {course.courseTitle}</Text>
      <Text style={styles.courseCredit}>Credits: {course.courseCredit}</Text>
      <Text style={styles.prereqs}>Prerequisites: {course.prereqs}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  courseID: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  courseCredit: {
    fontSize: 14,
    marginTop: 4,
  },
  prereqs: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});

export default CourseItem;