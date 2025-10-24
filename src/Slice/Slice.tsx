import { createSlice, type PayloadAction, createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { Task } from "../Types/Task";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return response.data;
});

// Add a typed state shape so builder types are inferred correctly
interface TaskState {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  filter: "all" | "completed" | "pending";
}

const initialState: TaskState = {
  items: [],
  status: "idle",
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState, // use the typed initialState
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
    // narrow the payload type to the filter union
    setFilter(state, action: PayloadAction<TaskState["filter"]>) {
      state.filter = action.payload;
    },
  },
  // type the builder to avoid implicit any errors
  extraReducers: (builder: ActionReducerMapBuilder<TaskState>) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
