// src/api/service/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface IParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
}

export const useUsers = () => {

  // 🔹 Barcha foydalanuvchilarni olish
  const getUsers = (params: IParams) =>
    useQuery({
      queryKey: ["users", params],
      queryFn: () => api.get("/user", { params }).then((res) => res.data),
    });

  return { getUsers };
};
