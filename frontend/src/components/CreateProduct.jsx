import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, quantity: 0 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || formData.price <= 0) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }
    api.post('/products/', formData)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((error) => {
        setError('Error al agregar el producto.');
        console.error(error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginY: 4 }}>Agregar Nuevo Producto</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Producto agregado con éxito. Redirigiendo...</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          required
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
          required
          margin="normal"
        />
        <TextField
          label="Cantidad"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Agregar Producto
        </Button>
      </form>
    </Container>
  );
}

export default CreateProduct;
