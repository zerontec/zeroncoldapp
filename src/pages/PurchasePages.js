import React, { useState } from 'react';
import styled from 'styled-components';

import {Typography } from '@mui/material';
import {Purchases } from '../sections/@dashboard/Purchases'


const FormTipo = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: rgb(255, 107, 107);
  border-radius: 20px;
`


const PurchasePage = () => (
    <>
    <FormTipo>
 <Typography style={{marginLeft:15, marginTop:10}} color="white" variant="h5" sx={{ marginBottom: 2 }}>
          Resumen de Compra
        </Typography>
        </FormTipo>

  <Purchases/>
   
    </>
  );

export default PurchasePage;



