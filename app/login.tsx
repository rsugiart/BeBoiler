
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../lib/firebase'; // adjust path if needed

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter both email and password.');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      router.replace('/(tabs)/feed'); // adjust this to your main app route
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BeBoiler Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//     Alert,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = () => {
//     // Firebase logic will be added
//     Alert.alert('Login pressed', `Email: ${email}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>BeBoiler Login</Text>

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Log In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/signup')}>
//         <Text style={styles.linkText}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6B4F4F',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
  linkText: { textAlign: 'center', color: '#007AFF', marginTop: 8 },
});
