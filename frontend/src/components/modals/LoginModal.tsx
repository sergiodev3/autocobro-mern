import React, { useState } from 'react';
import Modal from '../common/Modal';
import type { User } from '../../types';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
  adminMode?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  adminMode = false
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simular autenticación (aquí iría la llamada real al API)
      const mockUser: User = {
        _id: '1',
        name: 'Usuario Demo',
        email: formData.email,
        role: adminMode ? 'admin' : 'client',
        points: adminMode ? 0 : 150,
        cashback: 0,
        isActive: true,
        totalPurchases: adminMode ? 0 : 5,
        totalSpent: adminMode ? 0 : 250
      };

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onLogin(mockUser);
      onClose();
      
      // Limpiar form
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error al escribir
    if (error) setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={adminMode ? '🔐 Acceso Administrativo' : '👤 Iniciar Sesión'}
      size="small"
    >
      <div className="login-modal">
        {/* Descripción */}
        <div className="login-description">
          {adminMode ? (
            <p>Accede con tus credenciales de administrador para gestionar el sistema</p>
          ) : (
            <p>Inicia sesión para acumular puntos y ver tu historial de compras</p>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Tu contraseña"
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Submit button */}
          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Iniciando sesión...
              </>
            ) : (
              <>
                <span>{adminMode ? '🔓' : '✨'}</span>
                {adminMode ? 'Acceder como Admin' : 'Iniciar Sesión'}
              </>
            )}
          </button>
        </form>

        {/* Footer actions */}
        {!adminMode && (
          <div className="login-footer">
            <div className="divider">
              <span>¿No tienes cuenta?</span>
            </div>
            <button 
              type="button"
              className="register-link-btn"
              onClick={onSwitchToRegister}
              disabled={loading}
            >
              <span>🚀</span>
              Crear cuenta nueva
            </button>
          </div>
        )}

        {/* Demo credentials info */}
        <div className="demo-info">
          <p><strong>Demo:</strong> Usa cualquier email y contraseña</p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;