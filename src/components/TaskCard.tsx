import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import Task from "../types/Task";

const STATUS_TEXT_COLOR = {
  SCHEDULED: "text-sky-600",
  COMPLETED: "text-green-600",
  CANCELLED: "text-red-600",
};

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col p-4 border rounded-md">
      <div className="flex justify-between gap-4">
        <h3>{task.title}</h3>
        <Link to={`/edit-task/${task._id}`}>
          <FaRegEdit />
        </Link>
      </div>

      <p>{task.description}</p>
      <p>{Intl.DateTimeFormat("pt-BR").format(new Date(task.date))}</p>
      {task.interval && (
        <p>{`Once every ${
          task.interval.value
        } ${task.interval.unit.toLowerCase()}`}</p>
      )}
      <p className={STATUS_TEXT_COLOR[task.status]}>{task.status}</p>

      {task.pet.name && (
        <div className="mt-4">
          <Link
            to={`/pet/${task.pet._id}`}
            className="bg-sky-600 rounded-lg px-4 py-1 self-start"
          >
            {task.pet.name}
          </Link>
        </div>
      )}
    </div>
  );
}
