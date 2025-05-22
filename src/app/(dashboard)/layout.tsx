export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h2>FortressOS Dashboard</h2>
      </header>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
