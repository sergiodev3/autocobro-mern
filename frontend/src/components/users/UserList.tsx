import React, { useState, useEffect } from "react";
import { userService } from "../../services/api";
import type { User } from "../../types";
import "../common/AdminLayout.css";
import "./UserList.css";

interface UserListProps {
  onBack: () => void;
}

const UserList: React.FC<UserListProps> = ({ onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      alert('Error al cargar usuarios. Revisa la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={onBack} className="back-btn">
          ← Volver al Dashboard
        </button>
        <h2 className="admin-title">Usuarios Registrados ({users.length})</h2>
        <div></div> {/* Spacer for flex layout */}
      </div>
      <div className="admin-content">
        {loading ? (
          <div className="loading-message">Cargando usuarios...</div>
        ) : users.length === 0 ? (
          <div className="empty-message">No hay usuarios registrados</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Puntos</th>
                <th>Fecha de registro</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role || 'client'}`}>
                      {u.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </td>
                  <td>{u.points || 0}</td>
                  <td>{new Date(u.createdAt || '').toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
