import { Stack } from 'expo-router';

export default function TaskStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f9f9f9' },
        headerTintColor: '#222',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}

// // import { Stack } from 'expo-router';
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TaskScreen from './index';
// import TaskDetailScreen from './detail';

// export type TaskStackParamList = {
//     TaskHome: undefined;
//     TaskDetail: { taskId: string };
//   };
// const Stack = createNativeStackNavigator<TaskStackParamList>();

// export default function TaskStackLayout() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: '#f9f9f9' },
//         headerTintColor: '#222',
//         headerTitleStyle: { fontWeight: 'bold' },
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         component={TaskScreen}
//         options={{ title: 'Tasks' }}
//       />
//       <Stack.Screen
//         name="detail"
//         component={TaskDetailScreen}
//         options={{ title: 'Task Details' }}
//       />
//     </Stack.Navigator>
//   );
// }
