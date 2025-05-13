import React from "react";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { StatCards } from "@/components/admin/dashboard/StatCards";
import { BookingAnalyticsChart } from "@/components/admin/dashboard/BookingAnalyticsChart";
import { RevenueOverviewChart } from "@/components/admin/dashboard/RevenueOverviewChart";
import { PopularDestinationsChart } from "@/components/admin/dashboard/PopularDestinationsChart";
import { RecentBookings } from "@/components/admin/dashboard/RecentBookings";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* Stats Cards */}
      <StatCards />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BookingAnalyticsChart />
        <RevenueOverviewChart />
      </div>

      {/* Additional Charts and Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* <PopularDestinationsChart /> */}
        <RecentBookings />
      </div>
    </div>
  );
};

export default Dashboard;
