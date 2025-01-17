import { Link } from "react-router-dom";
import { FaRegEdit, FaArrowRight, FaPaw } from "react-icons/fa";
import Task from "../types/Task";
import {
  calculateDaysTo,
  calculateHoursTo,
  formatTimeToString,
} from "../utils/timeCalculations";
import { DateTime } from "luxon";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  // note: format datetimes for visualization
  let remaining = 0;
  let remainingTimeString = "";
  let formattedDueDate = "";

  if (task.interval.unit === "HOURS") {
    remaining = calculateHoursTo(task.dueDate);
    remainingTimeString = formatTimeToString(remaining, "hour");
    formattedDueDate = DateTime.fromISO(task.dueDate).toLocaleString(
      DateTime.DATETIME_SHORT
    );
  } else {
    remaining = calculateDaysTo(task.dueDate);
    remainingTimeString = formatTimeToString(remaining, "day");
    formattedDueDate = DateTime.fromISO(task.dueDate).toLocaleString(
      DateTime.DATE_SHORT
    );
  }

  return (
    <div
      className={`flex flex-col p-4 border rounded-md ${getColor(remaining)}`}
    >
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
      <p>{`${formattedDueDate} (${remainingTimeString})`}</p>
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
