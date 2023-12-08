
import React, { } from 'react';
import styled from 'styled-components';
import {  Typography,  } from '@mui/material';
import { Devolutions } from '../sections/@dashboard/Devolutions';
import { BackButton } from '../components/BackButton';
import { FloatingButtonComponent } from '../components/FloatingButtonComponent';
import { FinishTaskTecn } from '../sections/@dashboard/FinishTaskTecn';


const FormTipo = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: #2196F3;
  border-radius: 20px;
`



const HistorialTaskTec = () => (
    <>

<FormTipo>
 <Typography style={{marginLeft:15, marginTop:10}} color="white" variant="h5" sx={{ marginBottom: 2 }}>
   Mis Tareas Terminadas
        </Typography>
        </FormTipo>


<FinishTaskTecn/>

   
<FloatingButtonComponent/>

    </>
  );

export default HistorialTaskTec;



