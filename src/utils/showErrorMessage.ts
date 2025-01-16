import { isAxiosError } from "axios";

type Data = {
  error: string;
  details?: string[];
};

export default function getErrorMessage(error: unknown): string {
  console.error(error);

  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as Data;

    if (data.error) {
      let message = data.error;

      if (data.details) {
        message += `\n${data.details.join("\n")}`;
      }

      return message;
    }
  }
  return "An unexpected error has occurred. Please try again later.";
}
