/*######################################################################################################
Task Details Screen

This screen displays the details of a specific task. 
Update Later:
- Fetch task details from an API or database
- Display task location and other relevant information
######################################################################################################*/
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import type {Task} from '../../../models/Task';
import { mockTaskData } from '../../../data/mockTask'; 
import { Button } from '@react-navigation/elements';

export default function TaskDetailsScreen() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [task, setTask] = useState<Task|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch (replace with real API call)
    const fetchTask = async () => {
      setLoading(true);
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const foundTask = mockTaskData.find((t) => t.id === id);
      setTask(foundTask ?? null);
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading task...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text>Task not found for ID: {id}.</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.detail}>Points: {task.points}</Text>
      <Text style={styles.detail}>
        Status: {task.completed ? 'Completed ✅' : 'Incomplete ❌'}
      </Text>
      <Text style={styles.detail}>Location: {task.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginTop: 4,
  },
});
