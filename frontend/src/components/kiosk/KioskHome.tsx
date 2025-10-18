import React from 'react';
import './KioskHome.css';

interface KioskHomeProps {
  onNavigate: (screen: 'shop' | 'login' | 'register' | 'admin') => void;
}

const KioskHome: React.FC<KioskHomeProps> = ({ onNavigate }) => {
  return (
    <div className="kiosk-home">
      <div className="kiosk-container">
        {/* Header */}
        <div className="kiosk-header">
          <h1 className="kiosk-title">
            🛒 <span>AutoCobro</span> Smart
          </h1>
          <p className="kiosk-subtitle">¿Cómo quieres comenzar hoy?</p>
        </div>

        {/* Main Options Grid */}
        <div className="kiosk-options">
          {/* Comprar sin cuenta */}
          <button 
            className="kiosk-option primary"
            onClick={() => onNavigate('shop')}
          >
            <div className="option-icon">🛍️</div>
            <div className="option-content">
              <h2>Comprar Ahora</h2>
              <p>Sin registro necesario<br />Rápido y fácil</p>
            </div>
          </button>

          {/* Cliente con cuenta */}
          <button 
            className="kiosk-option secondary"
            onClick={() => onNavigate('login')}
          >
            <div className="option-icon">👤</div>
            <div className="option-content">
              <h2>Mi Cuenta</h2>
              <p>Acumula puntos<br />Ve tu historial</p>
            </div>
          </button>

          {/* Registro */}
          <button 
            className="kiosk-option accent"
            onClick={() => onNavigate('register')}
          >
            <div className="option-icon">✨</div>
            <div className="option-content">
              <h2>Crear Cuenta</h2>
              <p>Únete y obtén<br />puntos gratis</p>
            </div>
          </button>

          {/* Admin */}
          <button 
            className="kiosk-option admin"
            onClick={() => onNavigate('admin')}
          >
            <div className="option-icon">⚙️</div>
            <div className="option-content">
              <h2>Administrador</h2>
              <p>Gestión del<br />sistema</p>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="kiosk-footer">
          <div className="info-cards">
            <div className="info-card">
              <span className="info-icon">🎯</span>
              <span>Productos frescos</span>
            </div>
            <div className="info-card">
              <span className="info-icon">⚡</span>
              <span>Compra rápida</span>
            </div>
            <div className="info-card">
              <span className="info-icon">💳</span>
              <span>Pago seguro</span>
            </div>
            <div className="info-card">
              <span className="info-icon">🏆</span>
              <span>Gana puntos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskHome;