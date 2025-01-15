import { Link } from "react-router-dom";
import PetWeightRecord from "../types/PetWeightRecord";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DateTime } from "luxon";

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
        {`${DateTime.fromISO(petWeightRecord.date).toLocaleString(
          DateTime.DATE_SHORT
        )} - ${petWeightRecord.value} kg`}
      </p>
      <div className="flex justify-end gap-2 mb-4">
        <Link
          to={`/pets/${petWeightRecord.pet}/weight-records/${petWeightRecord._id}/edit`}
        >
          <FaRegEdit />
        </Link>
        <button onClick={onDeleteClick}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}
