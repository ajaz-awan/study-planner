import React, { useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert,
} from "react-native";
import { useTasks } from "../../Context/TaskContext";
import { useTheme } from "../../Context/ThemeContext";
import { useAuth } from "../../Context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TasksScreen() {
  const { tasks, toggleDone, deleteTask } = useTasks();
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

  const filtered = tasks.filter((t: any) => {
    if (filter === "pending") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const priorityColor = (p: string) => {
    if (p === "High") return "#FF4444";
    if (p === "Medium") return "#FF9800";
    return "#4CAF50";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.hello, { color: colors.subtext }]}>Hello 👋</Text>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        </View>
        <View style={styles.headerBtns}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons name={isDark ? "sunny" : "moon"} size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.iconBtn}>
            <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterRow}>
        {(["all", "pending", "done"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && { backgroundColor: colors.primary }]}
            onPress={() => setFilter(f)}
          >
            <Text style={{ color: filter === f ? "#fff" : colors.subtext, textTransform: "capitalize" }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>No tasks found!</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.cardLeft} onPress={() => toggleDone(item.id)}>
              <Ionicons
                name={item.done ? "checkmark-circle" : "ellipse-outline"}
                size={24} color={item.done ? colors.success : colors.subtext}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[styles.taskTitle, { color: colors.text, textDecorationLine: item.done ? "line-through" : "none" }]}>
                  {item.subject}
                </Text>
                <Text style={[styles.taskSub, { color: colors.subtext }]}>
                  {item.date} • {item.time}
                </Text>
                <View style={[styles.badge, { backgroundColor: priorityColor(item.priority) + "22" }]}>
                  <Text style={[styles.badgeText, { color: priorityColor(item.priority) }]}>{item.priority}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => router.push({ pathname: "/(tabs)/add-task", params: { editId: item.id } } as any)}>
                <Ionicons name="pencil" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Delete", "Delete this task?", [
                { text: "Cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteTask(item.id) },
              ])} style={{ marginTop: 12 }}>
                <Ionicons name="trash" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  hello: { fontSize: 14 },
  name: { fontSize: 20, fontWeight: "bold" },
  headerBtns: { flexDirection: "row" },
  iconBtn: { marginLeft: 12 },
  filterRow: { flexDirection: "row", marginBottom: 16, gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#E0E0E022" },
  card: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, flexDirection: "row", alignItems: "center" },
  cardLeft: { flexDirection: "row", flex: 1, alignItems: "flex-start" },
  cardActions: { alignItems: "center" },
  taskTitle: { fontSize: 16, fontWeight: "600" },
  taskSub: { fontSize: 12, marginTop: 2 },
  badge: { marginTop: 6, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, alignSelf: "flex-start" },
  badgeText: { fontSize: 11, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 60, fontSize: 16 },
});