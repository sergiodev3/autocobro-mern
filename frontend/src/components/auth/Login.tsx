import React, { useState } from "react";
import { userService } from "../../services/api";
import "./Auth.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      // Obtener todos los usuarios y verificar credenciales
      const response = await userService.getAll();
      const users = response.data;
      
      const user = users.find((u: { email: string; password: string; name: string }) => 
        u.email === email && u.password === password
      );

      if (user) {
        alert(`¡Bienvenido, ${user.name}!`);
        // Aquí podrías guardar el usuario en localStorage o context
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
