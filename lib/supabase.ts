import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aygcwxyhdvaupmcihtwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Z2N3eHloZHZhdXBtY2lodHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDgwNDMsImV4cCI6MjA5NTk4NDA0M30.lOFhVylxrPVaCbhQT5avrQue4FKjyP9fAbjTYts_2Ik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});