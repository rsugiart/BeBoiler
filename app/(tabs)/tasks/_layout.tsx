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
