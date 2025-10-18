import React from "react";
import type { User } from "../types";
import "./Dashboard.css";

interface DashboardProps {
  user: User | null;
  onNavigate: (screen: 'products' | 'users' | 'transactions') => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Control - {user?.name}</h1>
        <button onClick={onLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => onNavigate('products')}>
          <h2>Productos</h2>
          <p>120</p>
          <button className="card-btn">Gestionar</button>
        </div>
        <div className="dashboard-card" onClick={() => onNavigate('users')}>
          <h2>Usuarios</h2>
          <p>45</p>
          <button className="card-btn">Ver Lista</button>
        </div>
        <div className="dashboard-card" onClick={() => onNavigate('transactions')}>
          <h2>Transacciones</h2>
          <p>320</p>
          <button className="card-btn">Historial</button>
        </div>
      </div>
      <div className="dashboard-graph">
        <h2>Actividad Reciente</h2>
        <div className="graph-placeholder">
          {/* Aquí se puede integrar un gráfico real más adelante */}
          <span>Gráfico de ejemplo</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;