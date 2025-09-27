import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // Ruta de la imagen
  barcode: { type: String, required: true, unique: true }, // Para el lector óptico
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
