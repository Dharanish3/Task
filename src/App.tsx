import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./Slice/Slice";
import TaskInput from "./Pages/TaskInput";
import TaskList from "./Pages/TaskList";

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg bg-white rounded">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
