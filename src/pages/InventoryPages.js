
import React, { } from 'react';
import styled from 'styled-components';
import {  Typography,  } from '@mui/material';
import { Inventory } from '../sections/@dashboard/Inventory';
import { BackButton } from '../components/BackButton';


const FormTipo = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: #FF5722;
  border-radius: 20px;
`



const InventoryPages = () => (
    <>

<FormTipo>
 <Typography style={{marginLeft:15, marginTop:10}} color="white" variant="h5" sx={{ marginBottom: 2 }}>
          Inventario de productos
        </Typography>
        </FormTipo>

<BackButton/>

<Inventory/>
   
    </>
  );

export default InventoryPages;



