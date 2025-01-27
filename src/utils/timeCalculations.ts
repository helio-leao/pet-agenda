import { DateTime } from "luxon";

export function calculateDaysTo(date: Date | string | number): number {
  const dueDate = DateTime.fromJSDate(
    typeof date === "string" || typeof date === "number" ? new Date(date) : date
  );
  if (!dueDate.isValid) {
    throw new Error("Invalid date input");
  }
  const now = DateTime.now();
  return Math.ceil(dueDate.diff(now, "days").days);
}

export function calculateHoursTo(date: Date | string | number): number {
  const dueDate = DateTime.fromJSDate(
    typeof date === "string" || typeof date === "number" ? new Date(date) : date
  );
  if (!dueDate.isValid) {
    throw new Error("Invalid date input");
  }
  const now = DateTime.now();
  return Math.ceil(dueDate.diff(now, "hours").hours);
}

export function calculateAge(dateOfBirth: string | Date | number): number {
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

export function calculateAgeDetailed(dateOfBirth: Date | string | number): {
  years: number;
  months: number;
} {
  const dob = DateTime.fromJSDate(
    typeof dateOfBirth === "string" || typeof dateOfBirth === "number"
      ? new Date(dateOfBirth)
      : dateOfBirth
  );

  if (!dob.isValid) {
    throw new Error("Invalid date input");
  }

  const now = DateTime.now();
  const diff = now.diff(dob, ["years", "months"]);

  return {
    years: Math.floor(diff.years),
    months: Math.floor(diff.months % 12),
  };
}

export function ageString(birthdate: Date | string | number): string {
  const { months, years } = calculateAgeDetailed(birthdate);

  const yearPart = years > 0 ? `${years} ${years > 1 ? "years" : "year"}` : "";
  const monthPart =
    months > 0 ? `${months} ${months > 1 ? "months" : "month"}` : "";

  if (yearPart && monthPart) {
    return `${yearPart} and ${monthPart}`;
  }
  return yearPart || monthPart || "0 months";
}

export function formatTimeToString(value: number, unit: "hour" | "day") {
  if (value === 0) {
    return unit === "day" ? "today" : "this hour";
  }
  if (value < 0) {
    const abs = Math.abs(value);
    return `${abs} ${abs > 1 ? `${unit}s` : unit} ago`;
  }
  return `${value} ${value > 1 ? `${unit}s` : unit}`;
}
