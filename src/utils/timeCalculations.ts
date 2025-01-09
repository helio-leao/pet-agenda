import { DateTime } from "luxon";

function calculateDaysTo(date: Date | string | number): number {
  const dueDate = DateTime.fromJSDate(
    typeof date === "string" || typeof date === "number" ? new Date(date) : date
  );
  if (!dueDate.isValid) {
    throw new Error("Invalid date input");
  }
  const now = DateTime.now();
  return Math.ceil(dueDate.diff(now, "days").days);
}

function calculateAge(dateOfBirth: string | Date | number): number {
  const dob = DateTime.fromJSDate(
    typeof dateOfBirth === "string" || typeof dateOfBirth === "number"
      ? new Date(dateOfBirth)
      : dateOfBirth
  );
  if (!dob.isValid) {
    throw new Error("Invalid date input");
  }
  const now = DateTime.now();
  return now.diff(dob, "years").years | 0;
}

export { calculateDaysTo, calculateAge };
