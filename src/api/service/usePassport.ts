// src/api/service/usePassport.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const usePassport = () => {
  const getPassports = () =>
    useQuery({
      queryKey: ["passport"],
      queryFn: () => api.get("/passport").then((res) => res.data),
    });

  return { getPassports }; // 🔹 obyekt qaytaradi
};
