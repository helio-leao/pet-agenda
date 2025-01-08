import Pet from "./Pet";

export default interface Task {
  _id: string;
  user: string;
  pet: Pet;
  title: string;
  description: string;
  date: Date;
  interval: number;
  intervalUnit: "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS";
  history: Date[];
}
