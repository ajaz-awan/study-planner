import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useTasks } from "../../Context/TaskContext";
import { useTheme } from "../../Context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTaskScreen() {
  const { tasks, addTask, editTask } = useTasks();
  const { colors } = useTheme();
  const router = useRouter();
  const { editId } = useLocalSearchParams();

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editId) {
      const task = tasks.find((t: any) => t.id === editId);
      if (task) {
        setSubject(task.subject);
        setDate(new Date(`${task.date}T${task.time}`));
        setPriority(task.priority);
        setNotes(task.notes || "");
      }
    }
  }, [editId]);

  const handleSave = async () => {
    if (!subject.trim()) return Alert.alert("Error", "Subject is required");
    const taskData = {
      subject: subject.trim(),
      date: date.toLocaleDateString("en-CA"),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      priority,
      notes,
    };
    if (editId) {
      await editTask(editId as string, taskData);
    } else {
      await addTask(taskData);
    }
    Alert.alert("Success", editId ? "Task updated!" : "Task added!");
    router.push("/(tabs)/tasks" as any);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {editId ? "Edit Task" : "Add New Task"}
      </Text>

      <Text style={[styles.label, { color: colors.subtext }]}>Subject *</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="e.g. Mathematics Chapter 3"
        placeholderTextColor={colors.subtext}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={[styles.label, { color: colors.subtext }]}>Date</Text>
      <TouchableOpacity
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setShowDate(true)}
      >
        <Text style={{ color: colors.text }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker value={date} mode="date" onChange={(e, d) => { setShowDate(false); if (d) setDate(d); }} />
      )}

      <Text style={[styles.label, { color: colors.subtext }]}>Time</Text>
      <TouchableOpacity
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setShowTime(true)}
      >
        <Text style={{ color: colors.text }}>{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
      </TouchableOpacity>
      {showTime && (
        <DateTimePicker value={date} mode="time" onChange={(e, d) => { setShowTime(false); if (d) setDate(d); }} />
      )}

      <Text style={[styles.label, { color: colors.subtext }]}>Priority</Text>
      <View style={styles.priorityRow}>
        {["Low", "Medium", "High"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.priorityBtn, priority === p && { backgroundColor: colors.primary }]}
            onPress={() => setPriority(p)}
          >
            <Text style={{ color: priority === p ? "#fff" : colors.subtext }}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.subtext }]}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, height: 80 }]}
        placeholder="Add notes..."
        placeholderTextColor={colors.subtext}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={styles.btnText}>{editId ? "Update Task" : "Save Task"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  label: { fontSize: 13, marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16, justifyContent: "center" },
  priorityRow: { flexDirection: "row", gap: 10 },
  priorityBtn: { flex: 1, padding: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#E0E0E022" },
  btn: { borderRadius: 12, padding: 16, alignItems: "center", marginTop: 24, marginBottom: 40 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});