import Task from "./Task";

export default interface TaskDoneRecord {
  _id: string;
  date: Date;
  task: Task;
}
