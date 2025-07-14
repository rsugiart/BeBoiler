//Top Level Layout
// app/_layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import { auth } from '@/lib/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
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

