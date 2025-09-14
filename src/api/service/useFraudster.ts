import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useFraudsters = () => {
  const fraudsterQuery = useQuery({
    queryKey: ["fraudster"],
    queryFn: () => api.get("/fraudster/count").then((res) => res.data),
  });

  return fraudsterQuery;
};
