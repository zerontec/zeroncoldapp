
import React, { useState } from 'react';
import {  Typography,  } from '@mui/material';
import styled from 'styled-components';
import Box from "@mui/material/Box";
import InvoiceTable from '../sections/@dashboard/Invoicetable/Invoicetable';
import { ButtonBar } from '../components/ButtonBar';

const FormTipo = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: rgb(0, 123, 255);
  border-radius: 20px;
`


const InvoicePages = () => (
    <>


<FormTipo>
 <Typography style={{marginLeft:15, marginTop:10}} color="white" variant="h5" sx={{ marginBottom: 2 }}>
         Lista de facturas
        </Typography>
        </FormTipo>
<ButtonBar 
button1={"Cuentas Por Cobrar"}
button1Link={'/dashboard/cuentasxc'}
button2={"Clientes"}
button2Link={'/dashboard/clientes'}
button3={"Reporte Ventas"}
           
/>

        <InvoiceTable/>

   
    </>
  );

export default InvoicePages;



