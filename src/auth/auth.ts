import axios from "axios";

axios.defaults.baseURL = "https://user-assessment-api.vercel.app/";

export const login = (credentials: { email: string; password: string }) => {
  return axios
    .post("/api/login", credentials)
    .then((response) => response.data);
};
