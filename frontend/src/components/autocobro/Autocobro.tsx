import React, { useState, useEffect } from "react";
import { productService, transactionService } from "../../services/api";
import type { CartItem } from "../../types";
import "./Autocobro.css";

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

interface AutocobroProps {
  onBack: () => void;
}

const Autocobro: React.FC<AutocobroProps> = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [barcode, setBarcode] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<string>("");

  // Cargar usuario actual del localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      // Usuario por defecto si no hay login
      setCurrentUser({ _id: "66f123456789abcdef012345", email: "usuario@demo.com", name: "Usuario Demo" });
    }
  }, []);

  // Buscar producto por código de barras
  const handleScan = async () => {
    if (!barcode.trim()) {
      alert("Ingresa un código de barras");
      return;
    }

    try {
      const response = await productService.getByBarcode(barcode);
      const product = response.data;
      
      if (product) {
        setCart(prev => {
          const exists = prev.find(item => item.id === product._id);
          if (exists) {
            return prev.map(item =>
              item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prev, {
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image && !product.image.startsWith('http') 
                ? `http://localhost:5000${product.image}` 
                : product.image || `https://dummyimage.com/80x80/6366f1/fff&text=${product.name.charAt(0)}`,
              quantity: 1,
              barcode: product.barcode
            }];
          }
        });
        setBarcode("");
      }
    } catch (error) {
      console.error('Error buscando producto:', error);
      alert("Producto no encontrado");
    }
  };

  const handleQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinish = async () => {
    if (!payment) {
      alert("Selecciona método de pago");
      return;
    }
    if (cart.length === 0) {
      alert("Agrega productos al carrito");
      return;
    }

    try {
      // Crear transacción en el backend
      const transaction = {
        userId: currentUser?._id || "demo-user",
        products: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        paymentMethod: payment
      };

      await transactionService.create(transaction);
      
      // Simular impresión de ticket
      alert(`¡Compra finalizada exitosamente!
Total: $${total}
Método de pago: ${payment}
Productos: ${cart.length}
¡Gracias por tu compra!`);
      
      setCart([]);
      setPayment("");
    } catch (error) {
      console.error('Error procesando compra:', error);
      alert("Error al procesar la compra. Intenta de nuevo.");
    }
  };

  return (
    <div className="autocobro-container">
      <div className="autocobro-header">
        <button onClick={onBack} className="back-btn" title="Volver al inicio">
          ← Volver
        </button>
        <h2>Bienvenido, {currentUser?.email || currentUser?.name || 'Usuario'}</h2>
      </div>
      <div className="scanner-section">
        <input
          type="text"
          placeholder="Escanea o ingresa código de barras"
          value={barcode}
          onChange={e => setBarcode(e.target.value)}
        />
        <button onClick={handleScan} title="Agregar producto">
          <span role="img" aria-label="scan">📷</span> Agregar
        </button>
      </div>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p>No hay productos agregados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="product-img" /></td>
                  <td>{item.name}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantity(item.id, -1)} className="qty-btn minus-btn" title="Disminuir">-</button>
                      <span className="qty">{item.quantity}</span>
                      <button onClick={() => handleQuantity(item.id, 1)} className="qty-btn plus-btn" title="Aumentar">+</button>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)} className="delete-btn" title="Eliminar">
                      <span role="img" aria-label="delete">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="summary-section">
        <h3>Total: ${total}</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="Efectivo"
              checked={payment === "Efectivo"}
              onChange={e => setPayment(e.target.value)}
            />
            Efectivo
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Tarjeta"
              checked={payment === "Tarjeta"}
              onChange={e => setPayment(e.target.value)}
            />
            Tarjeta de crédito
          </label>
        </div>
        <button className="finish-btn" onClick={handleFinish}>
          <span role="img" aria-label="ticket">🧾</span> Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Autocobro;
