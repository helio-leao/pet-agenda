import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

export default function TaskCard({ task }: { task: any }) {
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
      <p>{task.status}</p>

      {task.pet.name && (
        <Link
          to={`/pet/${task.pet._id}`}
          className="bg-sky-200 rounded-lg px-4 py-1 self-start"
        >
          {task.pet.name}
        </Link>
      )}
    </div>
  );
}
