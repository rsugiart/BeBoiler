/*######################################################################################################
Landing page of our app 

NOTE: There are TWO landing pages here. The current landing page here does NOT automatically enter the app, it
requires the user to press a button to enter (Change to a login page later). The one commented out is just a loading 
screen that automatically navigates to the rest of the app. 

######################################################################################################*/

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();

  const handleEnterApp = () => {
    router.replace('/(tabs)/feed'); // or any other screen like '/(tabs)/feed'
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to BeBoiler</Text>

        <TouchableOpacity style={styles.button} onPress={handleEnterApp}>
            <Text style={styles.buttonText}>Enter App</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3, // adds a bit of shadow on Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

/*######################################################################################################

NOTE: Code below is for a loading page that will just automatically enter app. Comment out everything
above this line before uncommenting the code below. 

########################################################################################################*/


// import { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function LandingPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.replace('/feed'); // or your preferred default tab
//     }, 1500); // 1.5 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to BeBoiler</Text>
//       <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 16 }} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold' },
// });
