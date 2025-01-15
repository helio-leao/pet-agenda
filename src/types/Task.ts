import Pet from "./Pet";

export default interface Task {
  _id: string;
  user: string;
  pet: Pet;
  title: string;
  description: string;
  dueDate: string;
  interval: {
    unit: "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
    value: number;
  };
}
