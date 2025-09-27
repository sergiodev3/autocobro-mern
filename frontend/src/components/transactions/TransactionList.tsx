import React, { useState, useEffect } from "react";
import { transactionService } from "../../services/api";
import type { Transaction } from "../../types";
import "./TransactionList.css";

const TransactionList: React.FC = () => {
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
    <div className="transaction-list-container">
      <h2>Historial de Transacciones</h2>
      {loading ? (
        <p>Cargando transacciones...</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Productos</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id}>
                <td>{t.userId}</td>
                <td>${t.total}</td>
                <td>{t.paymentMethod}</td>
                <td>{t.products.length} items</td>
                <td>{t.date ? new Date(t.date).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
