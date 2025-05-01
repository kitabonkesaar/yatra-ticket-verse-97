
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Calendar, 
  Bell, 
  ArrowRight,
  CalendarCheck,
  CircleCheck,
  CircleX
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell 
} from "recharts";

// Mock data for charts
const bookingData = [
  { name: 'Jan', bookings: 400 },
  { name: 'Feb', bookings: 300 },
  { name: 'Mar', bookings: 600 },
  { name: 'Apr', bookings: 800 },
  { name: 'May', bookings: 500 },
  { name: 'Jun', bookings: 900 },
  { name: 'Jul', bookings: 1100 },
];

const revenueData = [
  { name: 'Q1', value: 15000 },
  { name: 'Q2', value: 25000 },
  { name: 'Q3', value: 22000 },
  { name: 'Q4', value: 32000 },
];

const destinationData = [
  { name: 'Manali', value: 35 },
  { name: 'Ladakh', value: 25 },
  { name: 'Shimla', value: 20 },
  { name: 'Others', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for stats
const stats = [
  { 
    title: "Total Users", 
    value: 342, 
    icon: Users, 
    change: "+12%", 
    color: "bg-blue-100 text-blue-600" 
  },
  { 
    title: "Active Bookings", 
    value: 56, 
    icon: FileText, 
    change: "+3%", 
    color: "bg-green-100 text-green-600" 
  },
  { 
    title: "Upcoming Trips", 
    value: 24, 
    icon: Calendar, 
    change: "+18%", 
    color: "bg-orange-100 text-orange-600" 
  },
];

// Recent bookings
const recentBookings = [
  {
    id: "BK-1001",
    customer: "Raj Kumar",
    destination: "Manali Adventure",
    date: "2025-06-15",
    amount: 12500,
    status: "confirmed"
  },
  {
    id: "BK-1002",
    customer: "Priya Singh",
    destination: "Ladakh Explorer",
    date: "2025-06-22",
    amount: 24800,
    status: "pending"
  },
  {
    id: "BK-1003",
    customer: "Amit Shah",
    destination: "Shimla Weekend",
    date: "2025-06-10",
    amount: 8900,
    status: "confirmed"
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your admin portal</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-px h-8 bg-gray-200"></div>
          <Button>
            View Reports <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-base font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Booking Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={bookingData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="bookings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Revenue (₹)" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts and Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-none shadow-md lg:col-span-1">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      {booking.status === 'confirmed' ? (
                        <CircleCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <CalendarCheck className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-gray-500">{booking.destination}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{booking.amount.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Bookings <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
