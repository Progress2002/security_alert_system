import type { IncidentReport } from "@/components/IncidentForm";
import { supabase } from "./supabase";
import type { IncidentFetchResponse } from "@/types";

export async function addReport({
  title,
  status,
  description,
  studentId,
  regNumber,
  location,
}: Omit<IncidentReport, "timestamp">): Promise<IncidentReport | null> {
  const { data, error } = await supabase
    .from("incident_report")
    .insert([
      {
        id: crypto.randomUUID(),
        title,
        status,
        description,
        regNumber,
        location,
        studentId,
      },
    ])
    .select()
    .single();
  if (error) throw new Error("We could not send the Report!");
  return data as IncidentReport;
}
export async function fetchReportsById(
  id: string
): Promise<IncidentReport[] | undefined> {
  if (!id) return;
  const { data, error } = await supabase
    .from("incident_report")
    .select("*")
    .eq("studentId", id);

  if (error) throw new Error("We could not get the reports");
  return data.reverse() as IncidentReport[];
}
export async function fetchAllReports(): Promise<IncidentFetchResponse> {
  const {
    data: reports,
    count,
    error,
  } = await supabase.from("incident_report").select("*", { count: "exact" });

  if (error) throw new Error("We could not get the reports");
  return { reports, count };
}

export async function updateReport({
  id,
  newStatus,
}: {
  id: string;
  newStatus: string;
}) {
  const { error } = await supabase
    .from("incident_report")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) throw new Error("We could not update the report!");
}
