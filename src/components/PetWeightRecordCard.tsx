type PetWeightRecordCardProps = {
  petWeightRecord: any;
};

export default function PetWeightRecordCard({
  petWeightRecord,
}: PetWeightRecordCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-md">
      <p>{"pet.type"}</p>
      <p>{"pet.breed"}</p>
      {/* <p>{Intl.DateTimeFormat("pt-BR").format(new Date(pet.birthdate))}</p> */}
    </div>
  );
}
