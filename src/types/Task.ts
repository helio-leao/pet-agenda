import Pet from "./Pet";

export default interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: String;
  user: string;
  pet: Pet;
}
