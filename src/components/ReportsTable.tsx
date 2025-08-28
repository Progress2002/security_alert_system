import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, User } from "lucide-react";
import type { IncidentReport } from "./IncidentForm";
import { formatDateTime } from "@/lib/formatDate";

interface ReportsTableProps {
  reports: IncidentReport[] | undefined;
  showStudentId?: boolean;
  isPending?: boolean;
  onStatusToggle?: (
    reportId: string,
    studentId: string,
    newStatus: IncidentReport["status"]
  ) => void;
}

const ReportsTable = ({
  reports,
  showStudentId = false,
  onStatusToggle,
  isPending,
}: ReportsTableProps) => {
  const getStatusColor = (status: IncidentReport["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "investigating":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusText = (status: IncidentReport["status"]) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "investigating":
        return "Under Investigation";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  if (reports?.length === 0) {
    return (
      <Card className="shadow-lg border-blue-100">
        <CardContent className="py-16 text-center">
          <p className="text-gray-500">No reports found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reports?.map((report) => (
        <Card
          key={report.id}
          className="hover:shadow-lg transition-all duration-200 border-blue-100 hover:border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex flex-col-reverse gap-y-4 md:flex-row items-start justify-between">
              <CardTitle className="text-lg font-medium">
                {report.title}
              </CardTitle>
              <div className="flex justify-between  items-center gap-3 w-full md:w-auto">
                <Badge className={getStatusColor(report.status)}>
                  {getStatusText(report.status)}
                </Badge>
                {onStatusToggle && (
                  <Select
                    disabled={isPending}
                    value={report.status}
                    onValueChange={(newStatus: IncidentReport["status"]) =>
                      onStatusToggle(report.id, report.studentId, newStatus)
                    }>
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="investigating">
                        Under Investigation
                      </SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary">{report.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {showStudentId && (
                <div className="flex items-center gap-2 text-text-secondary">
                  <User className="h-4 w-4" />
                  <span>Student ID: {report.regNumber}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="h-4 w-4" />
                <span>{formatDateTime(report.timestamp)}</span>
              </div>

              {showStudentId ? (
                <a
                  href={
                    report.location?.lat != null && report.location?.lng != null
                      ? `https://www.google.com/maps?q=${report.location.lat},${report.location.lng}`
                      : undefined
                  }
                  target="_blank"
                  className="flex items-center gap-2 text-text-secondary group ">
                  <MapPin className="h-4 w-4 animate-bounce group-hover:text-primary-light" />
                  <span>{report.location.address}</span>
                  <span className="whitespace-pre">
                    [
                    {report.location?.lat != null
                      ? report.location.lat.toFixed(4)
                      : "N/A"}
                    ,
                    {report.location?.lng != null
                      ? report.location.lng.toFixed(4)
                      : "N/A"}
                    ]
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="h-4 w-4" />
                  <span>{report.location.address}</span>
                  <span className="whitespace-pre">
                    [{report.location.lat.toFixed(4)},
                    {report.location.lng.toFixed(4)}]
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportsTable;
