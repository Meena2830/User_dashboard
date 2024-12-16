import React, { useState } from "react";
import { User } from "../types/userTypes";
import "../styles/UserTable.scss";

interface UserTableProps {
  users: User[];
  onEdit: (updatedUser: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const sortedUsers = React.useMemo(() => {
    if (!sortConfig) return users;
    return [...users].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  const handleSort = (key: keyof User) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleSaveClick = () => {
    if (editedUser) {
      onEdit(editedUser);
      setEditingUserId(null);
      setEditedUser(null);
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: e.target.value });
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        role: e.target.value as "user" | "admin",
      });
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig.key === "email" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("role")}>
              Role{" "}
              {sortConfig.key === "role" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser?.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    value={editedUser?.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={editedUser?.role || "user"}
                    onChange={handleRoleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button className="save" onClick={handleSaveClick}>
                      Save
                    </button>
                    <button className="cancel" onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
