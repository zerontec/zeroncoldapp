
import React, { useState } from 'react';
import { Grid, Container, Typography,  } from '@mui/material';

import { ModuleLinks } from '../components/ModuleLinks';



const AdminPages = () => (
    <>

<Typography variant="h4" sx={{ mb: 5 }}>
         Panel Administración 
        </Typography>
<ModuleLinks/>
   
    </>
  );

export default AdminPages;



