import { apiClient } from "../../../shared/api/apiClient";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  const response = await apiClient.post("/auth/login", data);

  return response.data;
};

export async function register(data: RegisterData) {
  const response = await apiClient.post("/auth/register", data);

  return response.data;
}
