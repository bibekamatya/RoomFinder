import Logo from "@/components/Logo";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes, ownerRoutes, userRoutes } from "@/lib/config/sidebarMenuConfig";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const { user } = useUser();
  const pathname = usePathname();

  const routes =
    user?.role === "admin" ? adminRoutes : user?.role === "owner" ? ownerRoutes : userRoutes;

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={32} href="" />
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              RoomFinder
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.url}
                href={route.url}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(route.url)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
