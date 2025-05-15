import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Slice/Slice";

const TaskInput = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 p-2 border rounded"
        type="text"
        value={title}
        placeholder="Add a task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default TaskInput;
