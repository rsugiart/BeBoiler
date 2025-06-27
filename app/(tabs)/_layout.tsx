//Tab Navigator (was BeBoiler.tsx)

import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import FeedScreen from './screens/FeedScreen';
// import TasksScreen from './screens/TaskScreen';
// import MapScreen from './screens/MapScreen';
// import ProfileScreen from './screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof AntDesign.glyphMap = 'questioncircleo';

          if (route.name === 'feed') iconName = 'home';
          else if (route.name === 'tasks') iconName = 'checkcircleo';
          else if (route.name === 'map') iconName = 'enviromento';
          else if (route.name === 'profile') iconName = 'user';

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
