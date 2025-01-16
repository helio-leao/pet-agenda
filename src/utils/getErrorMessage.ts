import { isAxiosError } from "axios";

type Detail = {
  path: string;
  message: string;
};

type Data = {
  error: string;
  details?: Detail[];
};

export default function getErrorMessage(error: unknown): string {
  console.error(error);

  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as Data;

    if (data.error) {
      let message = data.error;

      if (data.details) {
        data.details.forEach((detail) => (message += `\n${detail.message}`));
      }
      return message;
    }
  }
  return "An unexpected error has occurred. Please try again later.";
}
