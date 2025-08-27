import type { IncidentReport } from "@/components/IncidentForm";
import {
  addReport,
  fetchAllReports,
  fetchReportsById,
  updateReport,
} from "@/services/ReportsApi";
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
    queryFn: () => fetchAllReports(),
    queryKey: ["All Reports"],
  });
  return { data, isLoading };
}
export function useAddReports() {
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Omit<IncidentReport, "timestamp">) => addReport(data),
    onSuccess: (_, variables) => {
      queryclient.invalidateQueries({
        queryKey: ["Reports", variables.studentId],
      });
      queryclient.invalidateQueries({
        queryKey: ["All Reports"],
      });
    },
  });
  return { mutate, isPending };
}

export function useUpdateReport() {
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      studentId,
      newStatus,
    }: {
      id: string;
      studentId: string;
      newStatus: string;
    }) => updateReport({ id, newStatus }),
    onSuccess: (_, variables) => {
      queryclient.invalidateQueries({
        queryKey: ["All Reports"],
      });
      queryclient.invalidateQueries({
        queryKey: ["Reports", variables.studentId],
      });
    },
  });
  return { mutate, isPending };
}
