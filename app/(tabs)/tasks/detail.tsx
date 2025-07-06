// app/(tabs)/tasks/TaskDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { TaskStackParamList } from './_layout';
import { useLocalSearchParams } from 'expo-router';


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

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams();

    // const task = tasks.find(t => t.id === id);
  
    // if (!task) return <Text>Task not found</Text>;

    return (
        <View style={styles.container}>
      <Text style={styles.title}>Task ID: {id}</Text>
      <Text style={styles.text}>This is the detail screen. More info will go here.</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});
