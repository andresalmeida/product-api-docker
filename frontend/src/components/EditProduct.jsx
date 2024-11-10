import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); // Obtener ID del producto desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/products/${id}`, formData)
      .then(() => {
        alert('Producto actualizado');
        navigate('/'); // Regresa a la lista de productos
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <TextField
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descripción"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio"
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cantidad"
        type="number"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Guardar Cambios
      </Button>
    </form>
  );
}

export default EditProduct;
