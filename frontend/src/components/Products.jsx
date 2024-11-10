import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad']],
      body: filteredProducts.map((product) => [
        product.id,
        product.name,
        product.description,
        `$${product.price.toFixed(2)}`,
        product.quantity,
      ]),
    });
    doc.save('reporte_inventario.pdf');
  };

  return (
    <div className="main-container">
      <div className="inner-container">
        <Typography className="title">Gestor de Inventario</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label="Buscar producto"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Button
              variant="contained"
              className="add-product"
              onClick={() => navigate('/create-product')}
            >
              Agregar Producto
            </Button>
            <Button
              variant="contained"
              className="export-pdf"
              onClick={generatePDF}
              startIcon={<PictureAsPdfIcon />}
            >
              Exportar PDF
            </Button>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => api.delete(`/products/${product.id}`).then(() => setProducts(products.filter(p => p.id !== product.id)))}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Products;
