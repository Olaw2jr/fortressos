export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="settings-layout">
      <div className="settings-content">
        {children}
      </div>
    </div>
  );
}
