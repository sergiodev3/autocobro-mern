import React, { useState } from 'react';
import Modal from '../common/Modal';
import type { User } from '../../types';
import './RegisterModal.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simular registro
      const newUser: User = {
        _id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: 'client',
        points: 50, // Puntos de bienvenida
        cashback: 0,
        isActive: true,
        totalPurchases: 0,
        totalSpent: 0
      };

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onRegister(newUser);
      onClose();
      
      // Limpiar form
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error al crear la cuenta. Intenta nuevamente.');
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
      title="🚀 Crear Nueva Cuenta"
      size="small"
    >
      <div className="register-modal">
        {/* Beneficios */}
        <div className="register-benefits">
          <h3>¡Únete y obtén beneficios!</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <span>50 puntos gratis</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📊</span>
              <span>Historial de compras</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💰</span>
              <span>Acumula cashback</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <span>Compras más rápidas</span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              disabled={loading}
              autoComplete="name"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repite tu contraseña"
              disabled={loading}
              autoComplete="new-password"
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
            className={`register-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Creando cuenta...
              </>
            ) : (
              <>
                <span>✨</span>
                Crear Mi Cuenta
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <div className="divider">
            <span>¿Ya tienes cuenta?</span>
          </div>
          <button 
            type="button"
            className="login-link-btn"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            <span>👤</span>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;