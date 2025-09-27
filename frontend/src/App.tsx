import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductAdmin from "./components/products/ProductAdmin";
import UserList from "./components/users/UserList";
import TransactionList from "./components/transactions/TransactionList";
import Autocobro from "./components/autocobro/Autocobro";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/transacciones">Transacciones</Link></li>
          <li><Link to="/autocobro">Autocobro</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<ProductAdmin />} />
        <Route path="/usuarios" element={<UserList />} />
  <Route path="/transacciones" element={<TransactionList />} />
  <Route path="/autocobro" element={<Autocobro />} />
      </Routes>
    </Router>
  );
}

export default App;
// ...existing code...
// ...existing code...
