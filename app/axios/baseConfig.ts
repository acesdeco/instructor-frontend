import axios, { AxiosError } from "axios";
const API_URL = "https://backend-server-6191-2f1fe018-ktb0l1sg.onporter.run";
console.log(API_URL);
const baseConfig = axios.create({
  baseURL: `${API_URL}/api/v1`, // Replace with your API base URL
  //  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { baseConfig, axios, AxiosError };
