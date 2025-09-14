import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useMyFraudsters = () => {
  const fraudstersQuery = useQuery({
    queryKey: ["my-fraudster"],
    queryFn: () => api.get("/fraudster/my-count").then((res) => res.data),
  });

  return fraudstersQuery;
};
