import Pet from "./Pet";

export default interface Task {
  _id: string;
  user: string;
  pet: Pet;
  title: string;
  description: string;
  dueDate: Date;
  interval: {
    unit: "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
    value: number;
  };
  history: Date[];
}
