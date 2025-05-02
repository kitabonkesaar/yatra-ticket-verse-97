
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface UsersHeaderProps {
  loading: boolean;
  totalUsers: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
  loading,
  totalUsers,
  searchQuery,
  onSearchChange,
  onAddUser
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Users List</CardTitle>
        <CardDescription>
          {loading ? "Loading users..." : `Total ${totalUsers} users`}
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search users..." 
            className="pl-9 pr-4 w-[280px]" 
            value={searchQuery} 
            onChange={e => onSearchChange(e.target.value)} 
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button onClick={onAddUser}>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
    </div>
  );
};
