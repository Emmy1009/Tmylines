import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Trash2, Edit3, Plus } from "lucide-react";

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        email: "",
        role: "user",
        password: ""
    });
    const [editingUser, setEditingUser] = useState(null);

    // ✅ Fetch all users
    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://tmylines-queh.onrender.com/api/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Add user
    const handleAddUser = async e => {
        e.preventDefault();
        try {
            await axios.post("https://tmylines-queh.onrender.com/api/users", newUser);
            setNewUser({ name: "", email: "", role: "user", password: "" });
            fetchUsers();
        } catch (error) {
            console.error("Add user failed:", error);
        }
    };

    // ✅ Delete user
    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`https://tmylines-queh.onrender.com/api/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    // ✅ Edit user
    const handleEdit = user => {
        setEditingUser(user);
    };

    // ✅ Save edited user
    const handleSaveEdit = async e => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/users/${editingUser.id}`,
                editingUser
            );
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-semibold d-flex align-items-center gap-2">
                <User size={26} /> User Management
            </h2>

            {/* Add User Form */}
            <form onSubmit={handleAddUser} className="mb-5 card shadow-sm p-4">
                <h5 className="mb-3">Add New User</h5>
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={newUser.name}
                            onChange={e =>
                                setNewUser({ ...newUser, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            value={newUser.email}
                            onChange={e =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value
                                })
                            }
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={newUser.role}
                            onChange={e =>
                                setNewUser({ ...newUser, role: e.target.value })
                            }
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={newUser.password}
                            onChange={e =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value
                                })
                            }
                            required
                        />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary w-100">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </form>

            {/* User Table */}
            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {editingUser?.id === user.id ? (
                                        <input
                                            className="form-control"
                                            value={editingUser.name}
                                            onChange={e =>
                                                setEditingUser({
                                                    ...editingUser,
                                                    name: e.target.value
                                                })
                                            }
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {editingUser?.id === user.id ? (
                                        <select
                                            className="form-select"
                                            value={editingUser.role}
                                            onChange={e =>
                                                setEditingUser({
                                                    ...editingUser,
                                                    role: e.target.value
                                                })
                                            }
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`badge ${
                                                user.role === "admin"
                                                    ? "bg-danger"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    {editingUser?.id === user.id ? (
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={handleSaveEdit}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManager;
