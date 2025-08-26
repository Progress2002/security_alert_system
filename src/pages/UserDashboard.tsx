import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import IncidentForm from "@/components/IncidentForm";
import type { IncidentReport } from "@/components/IncidentForm";
import ReportsTable from "@/components/ReportsTable";

const UserDashboard = () => {
  const [userReports, setUserReports] = useState<IncidentReport[]>([]);

  // Load reports from localStorage on component mount
  useEffect(() => {
    const savedReports = localStorage.getItem("userReports");
    if (savedReports) {
      const parsed = JSON.parse(savedReports);
      // Convert timestamp strings back to Date objects
      const reportsWithDates = parsed.map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp),
      }));
      setUserReports(reportsWithDates);
    }
  }, []);

  // Save reports to localStorage whenever userReports changes
  useEffect(() => {
    localStorage.setItem("userReports", JSON.stringify(userReports));

    // Also save to global reports for admin view
    const existingGlobalReports = localStorage.getItem("allReports");
    const globalReports = existingGlobalReports
      ? JSON.parse(existingGlobalReports)
      : [];

    // Update global reports with current user's reports
    const otherReports = globalReports.filter(
      (report: IncidentReport) => report.studentId !== "current-user"
    );
    const updatedGlobalReports = [...otherReports, ...userReports];
    localStorage.setItem("allReports", JSON.stringify(updatedGlobalReports));
  }, [userReports]);

  const handleSubmitReport = (reportData: Omit<IncidentReport, "id">) => {
    const newReport: IncidentReport = {
      ...reportData,
      id: Date.now().toString(),
    };

    setUserReports((prev) => [newReport, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Submit security incidents and track your reports
            </p>
          </div>
        </div>

        {/* Submit New Report Section */}
        <div className="mb-12">
          <IncidentForm onSubmit={handleSubmitReport} />
        </div>

        {/* User's Reports Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Reports
            </h2>
            <span className="text-gray-500">({userReports.length})</span>
          </div>

          <ReportsTable reports={userReports} showStudentId={false} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
