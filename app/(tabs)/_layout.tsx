// /*######################################################################################################
// Tab Navigator (was BeBoiler.tsx)

// NOTE path: app/(tabs)/_layout.tsx
// This sets up the bottom navigation tab.
// ######################################################################################################*/

// app/(tabs)/_layout.tsx
import { auth } from '@/lib/firebase-config';
import { Slot, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] !== '(tabs)';
    if (!checking) {
      if (!isLoggedIn && !inAuthGroup) {
        router.replace('/login');
      } else if (isLoggedIn && inAuthGroup) {
        router.replace('/(tabs)/feed');
      }
    }
  }, [checking, isLoggedIn, segments]);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

// import React from 'react';
// import { AntDesign } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';

// //Had to manually specify order of all the tabs
// export default function AppTabs() {
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="feed"
//         options={{
//           title: 'Feed',
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="task"
//         options={{
//           title: 'Tasks',
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="checkcircleo" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="map"
//         options={{
//           title: 'Map',
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="enviromento" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="user" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
