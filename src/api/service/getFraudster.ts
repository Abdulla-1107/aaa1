// src/api/service/useFraudster.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";


export const GetFraudster = () => {
  // 🔹 Barcha firibgarlarni olish
  const getFraudsters = () =>
    useQuery({
      queryKey: ["fraudsters"],
      queryFn: () => api.get("/fraudster").then((res) => res.data),
    });

  return { getFraudsters };
};
