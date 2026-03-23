type ApiError = {
  [key: string]: string[] | string;
};

export function handleFormErrors<T>(
  error: any,
  setError: (name: keyof T, error: { type: string; message: string }) => void
) {
  let message = "Something went wrong. Please try again.";

  const data: ApiError | undefined = error?.data;

  if (!data) return message;

  for (const [field, value] of Object.entries(data)) {
    const msg = Array.isArray(value) ? value[0] : value;

    if (field === "non_field_errors" || field === "detail") {
      message = msg;
    } else {
      setError(field as keyof T, {
        type: "server",
        message: msg,
      });
    }
  }

  return message;
}
