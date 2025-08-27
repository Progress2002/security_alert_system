import type { IncidentReport } from "@/components/IncidentForm";
import { addReport, fetchReportsById } from "@/services/ReportsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchReportsById(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["Reports", id],
    queryFn: () => fetchReportsById(id),
    enabled: !!id,
  });
  return { data, isLoading };
}
export function useFetchAllReports() {
  const { data, isLoading } = useQuery({
    queryKey: ["All Reports"],
  });
  return { data, isLoading };
}
export function useAddReports() {
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Omit<IncidentReport, "timestamp">) => addReport(data),
    onSuccess: (_, variables) =>
      queryclient.invalidateQueries({
        queryKey: ["Reports", variables.studentId],
      }),
  });
  return { mutate, isPending };
}
