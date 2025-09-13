// src/api/service/deleteFraudster.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export const useDeleteFraudster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/fraudster/${id}`);
    },
    onSuccess: () => {
      // faqat query invalidatsiya qilamiz
      queryClient.invalidateQueries({ queryKey: ["fraudsters"] });
    },
  });
};
