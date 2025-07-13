import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebase-config";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Info", "Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const db = getFirestore(); // if not already initialized, import your db instead
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        uid,
        createdAt: new Date().toISOString(),
      });

      router.replace("/(tabs)/feed");
    } catch (err: any) {
      console.log("[handleSignUp] =>", err.message);
      Alert.alert("Signup Failed", err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            textContentType="name"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="newPassword"
            style={styles.input}
          />
        </View>
      </View>

      {/* Button */}
      <Pressable onPress={handleSignUp} disabled={loading} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/login" asChild>
          <Pressable>
            <Text style={styles.signInText}> Sign In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#6B7280" },
  form: { width: "100%", maxWidth: 300, marginBottom: 32 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 4, marginLeft: 4 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" },
  footer: { flexDirection: "row", marginTop: 24 },
  footerText: { color: "#6B7280" },
  signInText: { color: "#2563EB", fontWeight: "600" },
});
