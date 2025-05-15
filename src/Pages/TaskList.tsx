import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import TaskItem from "./TaskItem";
import { setFilter } from "../Slice/Slice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = items.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("completed"))}>Completed</button>
        <button onClick={() => dispatch(setFilter("pending"))}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
