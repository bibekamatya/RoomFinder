import { Button } from "@/components/ui/button";
import { Link, Home, X } from "lucide-react";
import Navbar from "./navbar";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ setSidebarOpen, sidebarOpen }: SidebarProps) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-7 w-7 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Home className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            RoomFinder
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Navbar />
    </aside>
  );
};

export default Sidebar;
