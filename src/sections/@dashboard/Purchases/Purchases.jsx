
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Grid)`
  margin-bottom: 16px;
`;

const SummaryContainer = styled(Box)`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Purchases = () => {
  const [provider, setProvider] = useState({});
  const [invoice, setInvoice] = useState({});
  const [product, setProduct] = useState({});
  const [total, setTotal] = useState(0);

  const handleSearchProvider = () => {
    // Agregar lógica para buscar al proveedor
  };

  const handleAddProduct = () => {
    // Agregar lógica para agregar un producto
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Carga de Compras
      </Typography>

      {/* Formulario de búsqueda y agregar proveedor */}
      <FormContainer container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <TextField
            label="Buscar Proveedor"
            variant="outlined"
            fullWidth
            onChange={handleSearchProvider}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Nombre" variant="outlined" fullWidth value={provider.name || ''} disabled />
          <TextField
            label="Identificación"
            variant="outlined"
            fullWidth
            value={provider.identification || ''}
            disabled
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={provider.address || ''}
            disabled
          />
        </Grid>
      </FormContainer>

      {/* Formulario de datos de la factura */}
      <FormContainer container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <TextField label="Número de Factura" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Fecha de Factura" variant="outlined" fullWidth type="date" />
        </Grid>
      </FormContainer>

      {/* Resumen de la compra */}
      <SummaryContainer>
        <Typography variant="h6">Resumen de la Compra</Typography>
        <Typography>Total: {total}</Typography>
      </SummaryContainer>

      {/* Formulario de carga de producto */}
      <FormContainer container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={2}>
          <TextField label="Código" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Descripción" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField label="Precio" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField label="Costo" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField label="Precio de Venta" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </Grid>
      </FormContainer>
    </Box>
  );
};

export default Purchases;