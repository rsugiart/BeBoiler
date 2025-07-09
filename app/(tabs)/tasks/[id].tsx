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

type Task = {
    id: string;
    title: string;
    points: number;
    completed: boolean;
    type: 'daily' | 'special';
  };
  

const tasks:  Task []=[
  { id: '1', title: 'Snipe the Boiler Express', points: 50, completed: false, type: 'daily' },
  { id: '2', title: 'Study at the Wilhment Active Center', points: 30, completed: true, type: 'daily' },
  { id: '3', title: 'Grab a snack from the ReXCH event', points: 75, completed: false, type: 'special' },
  { id: '4', title: 'Walk under the bell tower', points: 100, completed: true, type: 'special' },
];


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
      const foundTask = tasks.find((t) => t.id === id);
      setTask(foundTask?? null);
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

// // app/(tabs)/tasks/TaskDetailScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// // import { RouteProp, useRoute } from '@react-navigation/native';
// // import { TaskStackParamList } from './_layout';
// import { useLocalSearchParams } from 'expo-router';


// export default function TaskDetailScreen() {
//     const { id } = useLocalSearchParams();

//     // const task = tasks.find(t => t.id === id);
  
//     // if (!task) return <Text>Task not found</Text>;

//     return (
//         <View style={styles.container}>
//       <Text style={styles.title}>Task ID: {id}</Text>
//       <Text style={styles.text}>This is the detail screen. More info will go here.</Text>
//     </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   text: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
// });
