import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export const Breadcrumbs = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600">
      <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <span>/</span>
      <span className="text-slate-900 font-medium">Dashboard</span>
    </nav>
  );
};