// screens/CourseListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import CourseItem from '../components/CourseItem';

const CourseListScreen = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from your API or local data
    const fetchCourses = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT_HERE');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.courseID}
        renderItem={({ item }) => <CourseItem course={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CourseListScreen;