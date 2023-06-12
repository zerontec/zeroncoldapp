
import React, { useState } from 'react';
import { Grid, Container, Typography,  } from '@mui/material';
import { CuentasPorCobrar } from '../sections/@dashboard/CuentasPorCobrar';





const CuentasxPages = () => (
    <>

<Typography variant="h4" sx={{ mb: 5 }}>
       Cuentas Por cobrar 
        </Typography>


<CuentasPorCobrar/>

   
    </>
  );

export default CuentasxPages;



