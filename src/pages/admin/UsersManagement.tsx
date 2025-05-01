
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, Search, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - in a real app, this would come from your backend
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    role: "Customer",
    status: "Active",
    lastActive: "2025-05-01T10:30:00",
    image: "https://ui-avatars.com/api/?name=John+Doe"
  }, 
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 91234 56789",
    role: "Customer",
    status: "Active",
    lastActive: "2025-04-29T14:45:00",
    image: "https://ui-avatars.com/api/?name=Jane+Smith&background=7e3af2&color=fff"
  }, 
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+91 87654 32109",
    role: "Admin",
    status: "Active",
    lastActive: "2025-05-01T09:15:00",
    image: "https://ui-avatars.com/api/?name=Bob+Johnson"
  }, 
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+91 76543 21098",
    role: "Customer",
    status: "Inactive",
    lastActive: "2025-04-20T11:30:00",
    image: "https://ui-avatars.com/api/?name=Alice+Brown&background=16a34a&color=fff"
  }, 
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+91 65432 10987",
    role: "Customer",
    status: "Active",
    lastActive: "2025-04-30T16:20:00",
    image: "https://ui-avatars.com/api/?name=Charlie+Wilson"
  }
];

const UsersManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    // For numeric fields
    return sortDirection === "asc" 
      ? Number(fieldA) - Number(fieldB) 
      : Number(fieldB) - Number(fieldA);
  });

  const filteredUsers = sortedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage all users of the platform</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users List</CardTitle>
              <CardDescription>Total {filteredUsers.length} users</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-9 pr-4 w-[280px]" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="min-w-[180px]">
                    <button 
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort('name')}
                    >
                      User {getSortIcon('name')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort('email')}
                    >
                      Email {getSortIcon('email')}
                    </button>
                  </TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort('role')}
                    >
                      Role {getSortIcon('role')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort('status')}
                    >
                      Status {getSortIcon('status')}
                    </button>
                  </TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.lastActive)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteUser(user.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
