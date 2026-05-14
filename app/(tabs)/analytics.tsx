import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTasks } from "../../Context/TaskContext";
import { useTheme } from "../../Context/ThemeContext";

export default function AnalyticsScreen() {
  const { tasks } = useTasks();
  const { colors } = useTheme();

  const total = tasks.length;
  const done = tasks.filter((t: any) => t.done).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const byPriority = (p: string) => tasks.filter((t: any) => t.priority === p).length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📊 Progress</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.percent, { color: colors.primary }]}>{percent}%</Text>
        <Text style={[styles.percentLabel, { color: colors.subtext }]}>Tasks Completed</Text>
        <View style={[styles.barBg, { backgroundColor: colors.border }]}>
          <View style={[styles.barFill, { width: `${percent}%` as any, backgroundColor: colors.primary }]} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: colors.text }]}>{total}</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: "#4CAF50" }]}>{done}</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Done</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statNum, { color: "#FF9800" }]}>{pending}</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Pending</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>By Priority</Text>
      {[
        { label: "High", color: "#FF4444" },
        { label: "Medium", color: "#FF9800" },
        { label: "Low", color: "#4CAF50" },
      ].map(({ label, color }) => (
        <View key={label} style={[styles.priorityRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={[styles.priorityLabel, { color: colors.text }]}>{label} Priority</Text>
          <Text style={[styles.priorityCount, { color: color }]}>{byPriority(label)} tasks</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { borderRadius: 16, padding: 24, alignItems: "center", borderWidth: 1, marginBottom: 16 },
  percent: { fontSize: 56, fontWeight: "bold" },
  percentLabel: { fontSize: 16, marginBottom: 16 },
  barBg: { width: "100%", height: 10, borderRadius: 5 },
  barFill: { height: 10, borderRadius: 5 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 1 },
  statNum: { fontSize: 28, fontWeight: "bold" },
  statLabel: { fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  priorityRow: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  priorityLabel: { flex: 1, fontSize: 15 },
  priorityCount: { fontSize: 14, fontWeight: "bold" },
});