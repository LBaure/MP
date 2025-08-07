import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Status } from "../interfaces/IResponse";

interface ErrorResponse {
  errors?: Record<string, string[]> | { description: string }[] | string;
}
export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ErrorResponse>;
    const data = err?.response?.data;

    if (!data) {
      if (err.response?.status === 401) {
        toast.warning("Session expired, please login again");
        window.history.pushState({}, "Login", "/login");
      } else {
        toast.error("Ocurrio un error al comunicarse con el servidor");
      }
      return;
    }

    // Case: Array of error objects with descriptions
    if (Array.isArray(data.errors)) {
      for (const val of data.errors) {
        if ("description" in val) {
          toast.warning(val.description);
        }
      }
      return;
    }

    // Case: Object with key -> array of strings
    if (typeof data.errors === "object" && data.errors !== null) {
      for (const key in data.errors) {
        if (Array.isArray(data.errors[key])) {
          toast.warning(data.errors[key][0]);
        }
      }
      return;
    }

    // Case: Single error message as string
    if (typeof data.errors === "string") {
      toast.warning(data.errors);
      return;
    }

    if (err.status === 404) {
      toast.warning("No se encontro el recurso solicitado");
      console.log("404");
      return;
    }

    toast.warning("An unknown error format was received.");
  } else if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message);
      if (typeof parsed === "object" && parsed !== null) {
        if (parsed.message) toast.warning(parsed.message);
        if (parsed.status === Status.ERROR && parsed.errors) {
          // manejar errores personalizados aquí
          if (Array.isArray(parsed.errors)) {
            for (const val of parsed.errors) {
              if ("description" in val) {
                toast.warning(val.description);
              }
            }
          } else if (typeof parsed.errors === "string") {
            toast.warning(parsed.errors);
          }
        }
      }
    } catch {
      toast.warning(error.message);
    }
    return;
  } else {
    toast.error("A non-Axios error occurred.");
  }
};
