/*######################################################################################################
Tab Navigator (was BeBoiler.tsx)

NOTE path: app/(tabs)/_layout.tsx
This sets up the bottom navigation tab.
######################################################################################################*/

// Removed large block of commented-out legacy code for improved readability and maintainability.
// app/(tabs)/_layout.tsx
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function AppTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="checkcircleo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="enviromento" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

