import PetWeightRecord from "../types/PetWeightRecord";

type PetWeightRecordCardProps = {
  petWeightRecord: PetWeightRecord;
};

export default function PetWeightRecordCard({
  petWeightRecord,
}: PetWeightRecordCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-md">
      <p>
        {`${Intl.DateTimeFormat("pt-BR").format(
          new Date(petWeightRecord.date)
        )} - ${petWeightRecord.value} kg`}
      </p>
    </div>
  );
}
