import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth, AuthProvider } from "../Context/AuthContext";
import { ThemeProvider } from "../Context/ThemeContext";
import { TaskProvider } from "../Context/TaskContext";

function RootNavigator() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
  if (loading) return;
  const inTabsGroup = segments[0] === "(tabs)" as never;
  if (user && !inTabsGroup) {
    router.replace("/(tabs)/tasks" as never);  // ✅ ye fix karo
  } else if (!user && inTabsGroup) {
    router.replace("/" as never);
  }
}, [user, segments, loading]);

  // ✅ Stack hamesha render hoga - null return mat karo
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <RootNavigator />
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}