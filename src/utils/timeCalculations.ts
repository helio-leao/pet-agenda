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

function calculateAgeDetailed(dateOfBirth: Date | string | number): {
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

function ageString(birthdate: Date | string | number) {
  const { months, years } = calculateAgeDetailed(birthdate);

  let ageString = "";

  if (years > 0) {
    ageString += `${years} ${years > 1 ? "years" : "year"}`;
  }
  if (years > 0 && months > 0) {
    ageString += " and ";
  }
  if (months > 0) {
    ageString += `${months} ${months > 1 ? "months" : "month"}`;
  }

  return ageString;
}

function formatDaysString(days: number) {
  let daysString = "";

  daysString += days;

  if (days > 1) {
    daysString += " days";
  } else {
    daysString += " day";
  }

  return daysString;
}

export {
  calculateDaysTo,
  calculateAge,
  calculateAgeDetailed,
  ageString,
  formatDaysString,
};
