import { Service } from "../interfaces/Service";
import { apiClient } from "./query";

export const getAllServices = async () => {
  const response = await apiClient.get<Service[]>("/raw");
  return response.data;
};
