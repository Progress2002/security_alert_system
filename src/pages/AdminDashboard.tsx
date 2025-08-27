import { useState, useEffect } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IncidentReport } from "@/components/IncidentForm";
import ReportsTable from "@/components/ReportsTable";
import StatisticsCards from "@/components/StatisticsCards";
import { useFetchAllReports, useUpdateReport } from "@/hooks/useReport";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { data, isLoading } = useFetchAllReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState<IncidentReport[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const reports = data?.reports;
  const count = data?.count || null;
  const { mutate, isPending } = useUpdateReport();
  // Filter reports based on search and status
  useEffect(() => {
    if (isLoading || !reports) return;
    let filtered = reports;
    if (filtered?.length === 0 || filtered === undefined) return;
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered?.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered?.filter((report) => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, statusFilter]);

  const handleUpdateReport = (
    reportId: string,
    studentId: string,
    newStatus: IncidentReport["status"]
  ) => {
    mutate(
      { id: reportId, newStatus, studentId },
      {
        onSuccess: () => toast("Report Updated"),
        onError: (error) => toast.error(error.message),
      }
    );
  };

  const handleExport = () => {
    const csvContent = [
      [
        "ID",
        "Title",
        "Description",
        "Student ID",
        "Status",
        "Timestamp",
        "Location",
      ],
      ...filteredReports.map((report) => [
        report.id,
        report.title,
        report.description,
        report.studentId,
        report.status,
        report.timestamp.toISOString(),
        report.location.address ||
          `${report.location.lat}, ${report.location.lng}`,
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `security-reports-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage security incident reports and system analytics
            </p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Export Reports</span>
          </Button>
        </div>

        <div className="space-y-6">
          <StatisticsCards
            reports={reports}
            count={count}
            isLoading={isLoading}
          />

          <Card className="shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Filter className="h-5 w-5 text-blue-600" />
                Filters <span className="hidden md:block">& Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reports, descriptions, or student IDs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="investigating">
                      Under Investigation
                    </SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  All Reports
                </h2>
                <span className="text-gray-500">
                  ({filteredReports.length} of {count})
                </span>
              </div>
            </div>

            <ReportsTable
              isPending={isPending}
              reports={filteredReports}
              showStudentId={true}
              onStatusToggle={handleUpdateReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
