
import React, { } from 'react';
import styled from 'styled-components';
import {  Typography,  } from '@mui/material';

import { FloatingButtonComponent } from '../components/FloatingButtonComponent';

import { TaskListTec } from '../sections/@dashboard/TaskListTec';


const FormTipo = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: #E91E63;
  border-radius: 20px;
`



const TaskListTecPage = () => (
    <>

<FormTipo>
 <Typography style={{marginLeft:15, marginTop:10}} color="white" variant="h5" sx={{ marginBottom: 2 }}>
 Mis Tareas Por Realizar
        </Typography>
        </FormTipo>

<TaskListTec/>


   
   <FloatingButtonComponent/>
    </>
  );

export default TaskListTecPage ;



