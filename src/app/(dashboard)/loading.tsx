export default function DashboardLoading() {
  return (
    <div className="dashboard-loading">
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
        <span className="ml-3">Loading...</span>
      </div>
    </div>
  );
}