import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../Context/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
      }}
    >
      <Tabs.Screen
        name="tasks"
        options={{ title: "Tasks", tabBarIcon: ({ color }) => <Ionicons name="list" size={22} color={color} /> }}
      />
      <Tabs.Screen
        name="add-task"
        options={{ title: "Add Task", tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={22} color={color} /> }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ title: "Progress", tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={22} color={color} /> }}
      />
    </Tabs>
  );
}