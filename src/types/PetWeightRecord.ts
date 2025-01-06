import Pet from "./Pet";

export default interface PetWeightRecord {
  _id: string;
  value: number;
  date: Date;
  pet: Pet;
}
