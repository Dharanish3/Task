import type { Task } from "../Types/Task";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../Slice/Slice";

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      </label>
      <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500">Delete</button>
    </li>
  );
};

export default TaskItem;
