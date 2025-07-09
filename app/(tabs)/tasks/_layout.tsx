/*######################################################################################################
Tasks Navigator 

NOTE path: app/(tabs)/tasks/_layout.tsx
Update Later:
- Integrate with backend for task data
- Add necessary buttons for task actions (e.g., create, edit, delete)
######################################################################################################*/
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
