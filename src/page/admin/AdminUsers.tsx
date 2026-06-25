import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Administrator" | "Editor" | "Shop Manager";
  status: "Active" | "Inactive";
  lastLogin: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Administrator", email: "admin@mojuri.com", role: "Administrator", status: "Active", lastLogin: "June 25, 2026 10:24 AM" },
    { id: 2, name: "Kiet Duong", email: "kiet@mojuri.com", role: "Administrator", status: "Active", lastLogin: "June 25, 2026 09:12 AM" },
    { id: 3, name: "Sarah Taylor", email: "sarah.t@mojuri.com", role: "Shop Manager", status: "Active", lastLogin: "June 24, 2026 04:35 PM" },
    { id: 4, name: "Lucas Vance", email: "lucas@mojuri.com", role: "Editor", status: "Inactive", lastLogin: "June 15, 2026 11:20 AM" }
  ]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Editor" as any });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const user: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: "Never"
    };
    setUsers([...users, user]);
    setIsAddMode(false);
    setNewUser({ name: "", email: "", role: "Editor" });
  };

  const deleteUser = (id: number) => {
    if (id === 1) {
      alert("Cannot delete primary Administrator account.");
      return;
    }
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      {isAddMode ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Add Staff Member</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setIsAddMode(false)}>
              Cancel
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAddSubmit} style={{ maxWidth: "500px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="admin-form-control"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Role</label>
                <select 
                  className="admin-form-control"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Shop Manager">Shop Manager</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">
                Save User
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Manage Staff / Users</h3>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setIsAddMode(true)}>
              + Add User
            </button>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>System Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>#USER-{user.id}</td>
                      <td style={{ fontWeight: 600, color: "#181c32" }}>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="admin-badge badge-info" style={{ backgroundColor: "#e2ebf0", color: "#2c3e50" }}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${user.status === "Active" ? "badge-success" : "badge-danger"}`}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ color: "#777", fontSize: "13px" }}>{user.lastLogin}</td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px" }}
                          disabled={user.id === 1}
                          onClick={() => alert("Edit user roles coming soon!")}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm" 
                          style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                          disabled={user.id === 1}
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
