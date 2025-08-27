import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from "lucide-react";
import type { IncidentReport } from "./IncidentForm";

interface StatisticsCardsProps {
  reports: IncidentReport[] | undefined;
  count: number | null;
  isLoading: boolean;
}

const StatisticsCards = ({
  reports,
  count,
  isLoading,
}: StatisticsCardsProps) => {
  const pendingReports = reports?.filter((r) => r.status === "pending").length;
  const investigatingReports = reports?.filter(
    (r) => r.status === "investigating"
  ).length;
  const resolvedReports = reports?.filter(
    (r) => r.status === "resolved"
  ).length;

  const recentReports = reports?.filter((r) => {
    const daysDiff =
      (new Date().getTime() - new Date(r?.timestamp).getTime()) /
      (1000 * 3600 * 24);
    return daysDiff <= 7;
  }).length;

  const stats = [
    {
      title: "Total Reports",
      value: count,
      icon: AlertTriangle,
      className: "border-blue-200 bg-blue-50 shadow-lg",
      iconClassName: "text-blue-600",
      preloadBg: "bg-blue-100",
    },
    {
      title: "Pending Review",
      value: pendingReports,
      icon: Clock,
      className: "border-amber-200 bg-amber-50 shadow-lg",
      iconClassName: "text-amber-600",
      preloadBg: "bg-amber-100",
    },
    {
      title: "Under Investigation",
      value: investigatingReports,
      icon: TrendingUp,
      className: "border-indigo-200 bg-indigo-50 shadow-lg",
      iconClassName: "text-indigo-600",
      preloadBg: "bg-indigo-100",
    },
    {
      title: "Resolved",
      value: resolvedReports,
      icon: CheckCircle,
      className: "border-green-200 bg-green-50 shadow-lg",
      iconClassName: "text-green-600",
      preloadBg: "bg-green-100",
    },
  ];
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={stat.className}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.iconClassName}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  <div
                    className={`${stat.preloadBg} animate-pulse w-1/2 h-8 rounded-md`}
                  ></div>
                </div>
                {stat.title === "Total Reports" &&
                  recentReports &&
                  recentReports > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {recentReports} in the last 7 days
                    </p>
                  )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={stat.className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconClassName}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              {stat.title === "Total Reports" &&
                recentReports &&
                recentReports > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {recentReports} in the last 7 days
                  </p>
                )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatisticsCards;
