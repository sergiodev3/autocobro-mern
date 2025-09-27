import axios from 'axios';
import type { Product, User, Transaction } from '../types';
import { config } from '../config';

// Instancia de axios con configuración base
const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Productos
export const productService = {
  // Obtener todos los productos
  getAll: () => api.get('/products'),
  
  // Obtener producto por ID
  getById: (id: string) => api.get(`/products/${id}`),
  
  // Obtener producto por código de barras (para autocobro)
  getByBarcode: (barcode: string) => api.get(`/products/price/${barcode}`),
  
  // Crear nuevo producto
  create: (product: Omit<Product, '_id'>) => api.post('/products', product),
  
  // Actualizar producto
  update: (id: string, product: Partial<Product>) => api.put(`/products/${id}`, product),
  
  // Eliminar producto
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Servicios para Usuarios
export const userService = {
  // Obtener todos los usuarios
  getAll: () => api.get('/users'),
  
  // Obtener usuario por ID
  getById: (id: string) => api.get(`/users/${id}`),
  
  // Crear nuevo usuario (registro)
  create: (user: Omit<User, '_id'>) => api.post('/users', user),
  
  // Actualizar usuario
  update: (id: string, user: Partial<User>) => api.put(`/users/${id}`, user),
  
  // Eliminar usuario
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Servicios para Transacciones
export const transactionService = {
  // Obtener todas las transacciones
  getAll: () => api.get('/transactions'),
  
  // Obtener transacción por ID
  getById: (id: string) => api.get(`/transactions/${id}`),
  
  // Crear nueva transacción (compra)
  create: (transaction: Omit<Transaction, '_id'>) => api.post('/transactions', transaction),
};

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;