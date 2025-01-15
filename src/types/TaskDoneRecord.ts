import Task from "./Task";

export default interface TaskDoneRecord {
  _id: string;
  date: string;
  task: Task;
}
