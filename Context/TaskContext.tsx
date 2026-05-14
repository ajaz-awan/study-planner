import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, set, onValue, remove, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const tasksRef = ref(db, "tasks/" + user.uid);
    const unsub = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setTasks(list);
      } else {
        setTasks([]);
      }
    });
    return () => unsub();
  }, [user]);

  const addTask = async (task: any) => {
    if (!user) return;
    const id = Date.now().toString();
    await set(ref(db, "tasks/" + user.uid + "/" + id), { ...task, id, done: false });
  };

  const editTask = async (id: string, updated: any) => {
    if (!user) return;
    await update(ref(db, "tasks/" + user.uid + "/" + id), updated);
  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    await remove(ref(db, "tasks/" + user.uid + "/" + id));
  };

  const toggleDone = async (id: string) => {
    if (!user) return;
    const task = tasks.find((t) => t.id === id);
    await update(ref(db, "tasks/" + user.uid + "/" + id), { done: !task.done });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleDone }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);