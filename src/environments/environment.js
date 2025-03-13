export const apiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:8000/api/";
  } else {
    return "http://127.0.0.1:8000/api/";
  }
};

export const webApiUrl = apiUrl();
