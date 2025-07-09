/*######################################################################################################
Task Navigator 

NOTE path: app/(tabs)/tasks/index.tsx
This sets up navigation to the individual task detail screens.
######################################################################################################*/
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { TaskStackParamList } from './_layout';
// import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';


type Task = {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  location: string;
  type: 'daily' | 'special';
};

const tasks: Task[] = [
  { id: '1', title: 'Snipe the Boiler Express', points: 50, completed: false, location: "Engineering Fountain", type: 'daily' },
  { id: '2', title: 'Study at the Wilhment Active Center', points: 30, completed: true,location: "WALC", type: 'daily' },
  { id: '3', title: 'Grab a snack from the ReXCH event', points: 75, completed: false,location: "MSEE", type: 'special' },
  { id: '4', title: 'Walk under the bell tower', points: 100, completed: true, location: "Bell Tower",type: 'special' },
];
type TaskProps = {
  task: Task;
  onPress: () => void;
};

const TaskItem = ({ task, onPress }: TaskProps) => {
    const router = useRouter();

    return (
      <Pressable onPress={onPress}>
        <View style={[styles.taskItem, task.completed && styles.completed]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskPoints}>+{task.points} pts</Text>
        </View>
      </Pressable>
    );
  };

export default function TaskScreen() {
  
    const daily = tasks.filter(t => t.type === 'daily' && !t.completed);
    const special = tasks.filter(t => t.type === 'special' && !t.completed);
    const completed = tasks.filter(t => t.completed);
    const router = useRouter();

    const onTaskPress = (taskId: string) => {
      // Navigate to task details screen
      router.push(`/tasks/${taskId}`);
    };
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Daily Tasks</Text>
        <FlatList
            data={daily}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem task={item} onPress={() => onTaskPress(item.id)} />}
        />

        <Text style={styles.header}>Special Tasks</Text>
        <FlatList
            data={special}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem task={item} onPress={() => onTaskPress(item.id)} />}
        />

        <Text style={styles.header}>Completed Tasks</Text>
        <FlatList
            data={completed}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem task={item} onPress={() => onTaskPress(item.id)} />}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completed: {
    backgroundColor: '#d0ffd6',
  },
  location: {
    fontWeight: 'bold',
    color: '#555',
  }
  ,
  taskTitle: {
    fontSize: 16,
    color: '#222',
  },
  taskPoints: {
    fontWeight: 'bold',
    color: '#555',
  },
});
