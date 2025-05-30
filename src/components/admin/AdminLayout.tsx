import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, FileText, Settings, LogOut, BarChart4, Car, Plane } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdminRoute } from "@/hooks/useAdminRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AdminLayout = () => {
  // Add this line to protect admin routes
  useAdminRoute();
  
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const { user, signOut } = useAuth();

  return <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r">
          <SidebarHeader>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-tr from-teal-400 to-teal-500 h-8 w-8 rounded-md flex items-center justify-center">
                  <span className="font-bold text-white">MY</span>
                </div>
                <h2 className="text-xl font-bold">Mo Yatra</h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-[23px] py-[5px]">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Main Menu
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin")}>
                  <Link to="/admin" className="flex items-center">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
                  <Link to="/admin/users" className="flex items-center">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/vehicles")}>
                  <Link to="/admin/vehicles" className="flex items-center">
                    <Car className="h-5 w-5" />
                    <span>Vehicles</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/trip-packages")}>
                  <Link to="/admin/trip-packages" className="flex items-center">
                    <Plane className="h-5 w-5" />
                    <span>Trip Packages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/bookings")}>
                  <Link to="/admin/bookings" className="flex items-center">
                    <FileText className="h-5 w-5" />
                    <span>Bookings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
                  <Link to="/admin/analytics" className="flex items-center">
                    <BarChart4 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="px-3 py-2 mt-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Settings
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                  <Link to="/admin/settings" className="flex items-center">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} alt={user?.email || "Admin User"} />
                  <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "A"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.user_metadata?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "admin@example.com"}</p>
                  <Link to="/admin/settings" className="text-xs text-bharat-orange hover:underline block mt-1 transition-colors">Profile</Link>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={signOut} title="Log out" className="p-1 rounded hover:bg-gray-200 transition-colors">
                        <LogOut className="h-4 w-4 text-gray-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Log out</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          <div className="p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default AdminLayout;
