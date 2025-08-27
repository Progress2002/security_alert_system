import IncidentForm from "@/components/IncidentForm";

const UserDashboard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Submit security incidents and track your reports
            </p>
          </div>
        </div>

        <div className="mb-12">
          <IncidentForm />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
