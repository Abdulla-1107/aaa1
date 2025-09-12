// src/api/service/useFraudster.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export const CreateFraudster = () => {
  const queryClient = useQueryClient();

  // 🔹 Fraudster yaratish
  const createFraudster = useMutation({
    mutationFn: (newFraudster: any) =>
      api.post("/fraudster", newFraudster).then((res) => res.data),

    onSuccess: () => {
      // Yangi yozuv qo‘shilganda cache yangilash
      queryClient.invalidateQueries({ queryKey: ["fraudster"] });
    },
  });

  return { createFraudster };
};
