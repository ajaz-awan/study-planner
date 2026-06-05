import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchTasks();

    // Realtime listener
    const subscription = supabase
      .channel('tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${user.id}` },
        () => { fetchTasks(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(subscription); };
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error && data) setTasks(data);
  };

  const addTask = async (task: any) => {
    if (!user) return;
    await supabase.from('tasks').insert({ ...task, user_id: user.id, done: false });
  };

  const editTask = async (id: string, updated: any) => {
    if (!user) return;
    await supabase.from('tasks').update(updated).eq('id', id);
  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    await supabase.from('tasks').delete().eq('id', id);
  };

  const toggleDone = async (id: string) => {
    if (!user) return;
    const task = tasks.find((t) => t.id === id);
    await supabase.from('tasks').update({ done: !task.done }).eq('id', id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleDone }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);