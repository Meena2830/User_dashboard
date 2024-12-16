import React, { useState } from "react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import Pagination from "../components/Pagination";
import { User } from "../types/userTypes";
import "../styles/Home.scss";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleAddUser = (user: User) => {
    if (currentUser) {
      setUsers(users.map((u) => (u.id === currentUser.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: `${users.length + 1}` }]);
    }
    setCurrentUser(null);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm
        onSubmit={handleAddUser}
        initialData={currentUser || undefined}
        users={users}
      />
      <UserTable
        users={currentUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
