
import React, { useState } from 'react';
import { Grid, Container, Typography,  } from '@mui/material';
import { Inventory } from '../sections/@dashboard/Inventory';





const InventoryPages = () => (
    <>

<Typography variant="h4" sx={{ mb: 5 }}>
         Inventario de Productos
        </Typography>




<Inventory/>
   
    </>
  );

export default InventoryPages;



