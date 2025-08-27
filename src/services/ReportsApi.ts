import type { IncidentReport } from "@/components/IncidentForm";
import { supabase } from "./supabase";

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
export async function fetchAllReports(): Promise<IncidentReport[] | undefined> {
  const { data, error } = await supabase
    .from("incident_report")
    .select("*")
    .limit(30);

  if (error) throw new Error("We could not get the reports");
  return data.reverse() as IncidentReport[];
}
