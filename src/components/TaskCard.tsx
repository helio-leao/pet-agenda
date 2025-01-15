import { Link } from "react-router-dom";
import { FaRegEdit, FaArrowRight, FaPaw } from "react-icons/fa";
import Task from "../types/Task";
import { calculateDaysTo, formatDaysString } from "../utils/timeCalculations";
import { DateTime } from "luxon";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const daysTo = calculateDaysTo(task.dueDate);

  return (
    <div className={`flex flex-col p-4 border rounded-md ${getColor(daysTo)}`}>
      <div className="flex justify-between gap-4">
        <h3>{task.title}</h3>
        <div className="flex items-center gap-4">
          <Link to={`/tasks/${task._id}/edit`}>
            <FaRegEdit />
          </Link>
          <Link to={`/tasks/${task._id}`}>
            <FaArrowRight />
          </Link>
        </div>
      </div>

      <p>{task.description}</p>
      <p>
        {DateTime.fromISO(task.dueDate).toLocaleString(DateTime.DATE_SHORT)} (
        {formatDaysString(daysTo)})
      </p>
      <p>{`Once every ${
        task.interval.value
      } ${task.interval.unit.toLowerCase()}`}</p>

      {task.pet.name && (
        <Link
          to={`/pets/${task.pet._id}`}
          className="flex items-center gap-4 self-start"
        >
          <FaPaw />
          {task.pet.name}
        </Link>
      )}
    </div>
  );
}

function getColor(daysTo: number): string {
  if (daysTo < 0) return "bg-red-200";
  if (daysTo <= 1) return "bg-yellow-200";
  return "";
}
