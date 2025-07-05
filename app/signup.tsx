
// app/signup.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../lib/firebase';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'Please fill out all fields.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      await db().collection('users').doc(uid).set({
        name,
        email,
        uid,
        createdAt: new Date().toISOString(),
      });

      router.replace('/(tabs)/feed'); // adjust to match your tab structure
    } catch (error: any) {
      Alert.alert('Signup failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a BeBoiler Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

// import { auth, db } from '../lib/firebase'; // adjust path if needed
// import { useRouter } from 'expo-router';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import {
//     Alert,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function SignupScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSignup = async () => {
//     if (!name || !email || !password) {
//       Alert.alert('Missing info', 'Please fill out all fields.');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const uid = userCredential.user.uid;

//       await setDoc(doc(db, 'users', uid), {
//         name,
//         email,
//         uid,
//         createdAt: new Date().toISOString(),
//       });

//       router.replace('/home'); // adjust if your main page is elsewhere
//     } catch (error: any) {
//       Alert.alert('Signup failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create a BeBoiler Account</Text>

//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//         autoCapitalize="words"
//       />

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

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.replace('/login')}>
//         <Text style={styles.linkText}>Already have an account? Log in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: '#007AFF',
    marginTop: 8,
  },
});
