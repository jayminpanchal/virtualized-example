import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const apiClient = axios.create({
  baseURL: "https://engineering-task.elancoapps.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
