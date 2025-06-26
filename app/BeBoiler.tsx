import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import FeedScreen from './screens/FeedScreen';
import TasksScreen from './screens/TaskScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof AntDesign.glyphMap = 'questioncircleo';

          if (route.name === 'Feed') iconName = 'home';
          else if (route.name === 'Tasks') iconName = 'checkcircleo';
          else if (route.name === 'Map') iconName = 'enviromento';
          else if (route.name === 'Profile') iconName = 'user';

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
