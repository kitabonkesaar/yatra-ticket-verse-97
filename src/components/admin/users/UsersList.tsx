
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/admin";

interface UsersListProps {
  users: User[];
  loading: boolean;
  sortField: string | null;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  loading,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete
}) => {
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

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead className="min-w-[180px]">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => onSort('name')}
              >
                User {getSortIcon('name')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => onSort('email')}
              >
                Email {getSortIcon('email')}
              </button>
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => onSort('role')}
              >
                Role {getSortIcon('role')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => onSort('status')}
              >
                Status {getSortIcon('status')}
              </button>
            </TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex justify-center items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map(user => (
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => onEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onDelete(user)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No users found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
