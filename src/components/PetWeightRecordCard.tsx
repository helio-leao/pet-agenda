import { Link } from "react-router-dom";
import PetWeightRecord from "../types/PetWeightRecord";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type PetWeightRecordCardProps = {
  petWeightRecord: PetWeightRecord;
  onDeleteClick: () => Promise<void>;
};

export default function PetWeightRecordCard({
  petWeightRecord,
  onDeleteClick,
}: PetWeightRecordCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-md justify-between">
      <p>
        {`${Intl.DateTimeFormat("pt-BR").format(
          new Date(petWeightRecord.date)
        )} - ${petWeightRecord.value} kg`}
      </p>
      <div className="flex justify-end gap-4 mb-4">
        <Link to={`/edit-pet-weight-record/${petWeightRecord._id}`}>
          <FaRegEdit />
        </Link>
        <button onClick={onDeleteClick}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}