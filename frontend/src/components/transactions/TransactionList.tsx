import React, { useState, useEffect } from "react";
import { transactionService } from "../../services/api";
import type { Transaction } from "../../types";
import "../common/AdminLayout.css";
import "./TransactionList.css";

interface TransactionListProps {
  onBack: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error cargando transacciones:', error);
      alert('Error al cargar transacciones');
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
        <h2 className="admin-title">Historial de Transacciones ({transactions.length})</h2>
        <div></div> {/* Spacer for flex layout */}
      </div>
      <div className="admin-content">
        {loading ? (
          <div className="loading-message">Cargando transacciones...</div>
        ) : transactions.length === 0 ? (
          <div className="empty-message">No hay transacciones registradas</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Productos</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t._id}>
                  <td>{t.userId || 'Usuario Anónimo'}</td>
                  <td>
                    <span className="amount">${t.total.toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`payment-badge ${t.paymentMethod}`}>
                      {t.paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}
                    </span>
                  </td>
                  <td>
                    <span className="product-count">{t.products.length} items</span>
                  </td>
                  <td>{t.date ? new Date(t.date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <span className="status-badge completed">Completada</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
