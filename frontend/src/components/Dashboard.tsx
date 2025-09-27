import React from "react";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Control</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Productos</h2>
          <p>120</p>
        </div>
        <div className="dashboard-card">
          <h2>Usuarios</h2>
          <p>45</p>
        </div>
        <div className="dashboard-card">
          <h2>Transacciones</h2>
          <p>320</p>
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