import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../api';

function GenerateReport() {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const response = await api.get('/products/');
    const products = response.data;

    doc.text('Reporte de Inventario', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad']],
      body: products.map((product) => [
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
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Generar Informe PDF
      </Typography>
      <Button variant="contained" color="primary" onClick={generatePDF}>
        Descargar Informe
      </Button>
    </Container>
  );
}

export default GenerateReport;
