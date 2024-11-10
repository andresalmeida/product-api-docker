import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import api from '../api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import LayersIcon from '@mui/icons-material/Layers';

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);

  useEffect(() => {
    api.get('/products/')
      .then((response) => {
        const products = response.data;
        setTotalProducts(products.length);
        setTotalValue(products.reduce((acc, product) => acc + product.price * product.quantity, 0));
        setTotalUnits(products.reduce((acc, product) => acc + product.quantity, 0));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: 'center' }}>
        Sistema de Gestión de Inventario
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#ff8f00', color: '#fff', borderRadius: '10px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Total de Productos</Typography>
              <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                {totalProducts}
                <InventoryIcon sx={{ fontSize: 40 }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#4caf50', color: '#fff', borderRadius: '10px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Valor Total del Inventario</Typography>
              <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                ${totalValue.toFixed(2)}
                <AttachMoneyIcon sx={{ fontSize: 40 }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#2196f3', color: '#fff', borderRadius: '10px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Total de Unidades en Inventario</Typography>
              <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                {totalUnits}
                <LayersIcon sx={{ fontSize: 40 }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
