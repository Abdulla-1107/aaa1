import { api } from "../api";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post("/login", data);
  return response.data;
};
