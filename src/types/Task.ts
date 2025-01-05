import Pet from "./Pet";

export default interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  interval: {
    unit: "DAYS" | "MONTHS" | "YEARS";
    value: number;
  } | null;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  user: string;
  pet: Pet;
}
