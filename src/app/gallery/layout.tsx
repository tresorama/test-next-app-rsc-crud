import { SidebarNavLinks } from "./_components/sidebar-nav-links";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="col-span-3 overflow-y-auto p-4 border rounded md:col-span-2">
        <SidebarNavLinks />
      </div>
      {/* Main */}
      <main className="col-span-9 overflow-y-auto p-4 border rounded md:col-span-10">
        {children}
      </main>
    </div>
  );
}
