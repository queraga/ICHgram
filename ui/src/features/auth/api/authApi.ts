import { apiClient } from "../../../shared/api/apiClient";

type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  const response = await apiClient.post("/auth/login", data);

  return response.data;
};
