import React, { useState, useEffect } from "react";
import { productService } from "../../services/api";
import type { Product } from "../../types";
import "../common/AdminLayout.css";
import "./ProductAdmin.css";

interface ProductAdminProps {
  onBack: () => void;
}

const ProductAdmin: React.FC<ProductAdminProps> = ({ onBack }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Campos del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Para edición
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrar productos cuando cambie el término de búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.includes(searchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setImageFile(null);
    setImagePreview("");
    setBarcode("");
    setEditingProduct(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || !barcode) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    try {
      setLoading(true);
      
      // Crear FormData para enviar archivo
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price.toString());
      formData.append('description', description);
      formData.append('barcode', barcode);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingProduct) {
        await productService.updateWithFile(editingProduct._id!, formData);
        alert('Producto actualizado exitosamente');
      } else {
        await productService.createWithFile(formData);
        alert('Producto creado exitosamente');
      }

      await loadProducts();
      clearForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error guardando producto:', error);
      alert('Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || "");
    // Mostrar imagen actual como preview si existe
    if (product.image) {
      setImagePreview(`http://localhost:5000${product.image}`);
    }
    setBarcode(product.barcode);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      setLoading(true);
      await productService.delete(id);
      alert('Producto eliminado exitosamente');
      await loadProducts();
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error al eliminar producto');
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
        <h2 className="admin-title">Administrar Productos ({products.length})</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
        >
          {showForm ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Formulario (mostrar/ocultar) */}
      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Nombre del producto *"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              required
            />
            <input
              type="text"
              placeholder="Código de barras *"
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              placeholder="Precio *"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              disabled={loading}
              min="0"
              step="0.01"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              style={{ fontSize: '14px' }}
            />
          </div>
          
          {/* Preview de la imagen */}
          {imagePreview && (
            <div className="image-preview">
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }} 
              />
            </div>
          )}
          
          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            rows={3}
          />
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      {/* Lista de productos */}
      {loading && products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img 
                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                    alt={product.name} 
                  />
                ) : (
                  <div className="no-image">
                    <span>📦</span>
                  </div>
                )}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-barcode">Código: {product.barcode}</p>
                <p className="product-price">${product.price}</p>
                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}
              </div>
              <div className="product-actions">
                <button 
                  onClick={() => handleEdit(product)}
                  className="btn-edit"
                  disabled={loading}
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={() => handleDelete(product._id!)}
                  className="btn-delete"
                  disabled={loading}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <p className="no-results">
          {searchTerm ? 'No se encontraron productos' : 'No hay productos registrados'}
        </p>
      )}
    </div>
  );
};

export default ProductAdmin;
