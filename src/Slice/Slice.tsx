import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "../Types/Task";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return response.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [] as Task[],
    status: "idle",
    filter: "all", // 'all' | 'completed' | 'pending'
  },
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.items.push(newTask);
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.items.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
