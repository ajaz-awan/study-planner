import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from "react-native";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Fill all fields");
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login Failed", e.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.title, { color: colors.primary }]}>📚 Study Planner</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>Login to continue</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Email" placeholderTextColor={colors.subtext}
        value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Password" placeholderTextColor={colors.subtext}
        value={password} onChangeText={setPassword} secureTextEntry
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleLogin}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={[styles.link, { color: colors.primary }]}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 32 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 16 },
  btn: { borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 16 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { textAlign: "center", fontSize: 14 },
});