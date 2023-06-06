
import React, { useState } from 'react';
import {  Typography,  } from '@mui/material';
import InvoiceTable from '../sections/@dashboard/Invoicetable/Invoicetable';
import { ButtonBar } from '../components/ButtonBar';





const InvoicePages = () => (
    <>

<Typography variant="h4" sx={{ mb: 5 }}>
         Lista de Facturas 
        </Typography>

<ButtonBar button1={"Cuentas Por Cobrar"}
button2={"Clientes"}
button3={"Reporte Ventas"}
           
/>

        <InvoiceTable/>

   
    </>
  );

export default InvoicePages;



