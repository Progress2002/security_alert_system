import ReportsTable from "@/components/ReportsTable";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UseAuth } from "@/contexts/AuthContext";
import { useFetchReportsById } from "@/hooks/useReport";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const { currentUser } = UseAuth();
  const { data, isLoading } = useFetchReportsById(currentUser?.id || "");
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-10vh)] bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Reports
            </h2>
          </div>
          <Card className="hover:shadow-lg transition-all duration-200 border-blue-100 hover:border-blue-200">
            <CardHeader className="pb-3 flex flex-col">
              <div className="ml-auto w-32 h-6 rounded-full bg-gray-100 animate-pulse"></div>
              <CardTitle
                className="w-1/3 h-6 rounded-xl animate-pulse bg-gray-100
                "
              ></CardTitle>
              <CardTitle
                className="w-1/2 h-4 rounded-sm mt-1 mb-4 animate-pulse bg-gray-100
                "
              ></CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      {/* Add back button */}
      <div className="container mx-auto px-4 pb-8 max-w-4xl">
        <Button
          className="my-5 cursor-pointer rounded-full border-primary-light bg-transparent py-1 px-3"
          variant="outline"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900">Your Reports</h2>
          <span className="text-gray-500">({data?.length})</span>
        </div>

        <ReportsTable showStudentId={false} reports={data} />
      </div>
    </div>
  );
}
