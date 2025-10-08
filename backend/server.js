import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/utils/db.js';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import transactionRoutes from './src/routes/transactionRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Configurar CORS para permitir conexiones desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend en Vite
  credentials: true
}));

app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
