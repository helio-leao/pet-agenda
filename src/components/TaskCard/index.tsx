import { Link } from "react-router-dom";

export default function TaskCard({ task }: { task: any }) {
  return (
    <div className="flex flex-col p-4 border rounded-md">
      <div className="flex justify-between gap-4">
        <h3>{task.title}</h3>
        <Link to={`/edit-task/${task._id}`}>Edit</Link>
      </div>

      <p>{task.description}</p>
      <p>{Intl.DateTimeFormat("pt-BR").format(new Date(task.date))}</p>
      <p>{task.status}</p>
      <Link to={`/pet/${task.pet._id}`}>{task.pet.name}</Link>
    </div>
  );
}
