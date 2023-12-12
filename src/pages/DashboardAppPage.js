import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { ShoppingCartOutlined } from '@ant-design/icons';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Button,Paper } from '@mui/material';
// components
import Iconify from '../components/iconify';


// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { ModuleLinks } from '../components/ModuleLinks';
import { FloatingButtonComponent } from '../components/FloatingButtonComponent';
import { SalesRealTime } from '../components/SalesRealTime';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const [valoresDolar, setValoresDolar] = useState({});
  const[dataDailySales, setDataDailySale]= useState({});

  // useEffect(() => {
  //   // Realiza la consulta inicial al cargar el componente
  //   fetchDolarValue();

  //   // Configura un intervalo para realizar consultas periódicas cada cierto tiempo
  //   const interval = setInterval(fetchDolarValue, 12 * 60 * 60 * 1000); // Consulta cada 12 horas

  //   // Limpia el intervalo cuando el componente se desmonta
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const fetchDolarValue = async () => {
  //   try {
  //     const response = await fetch('https://expressjs-postgres-production-bd69.up.railway.app/api/consulta/dolar');
  //     const data = await response.json();
      
  //     // Convertir los valores a números utilizando parseFloat
  //     const bcv = data.bcv;
  //     const enparalelovzla =data.enparalelovzla;
  //     // ...

  //     setValoresDolar({
  //       bcv,
  //       enparalelovzla,
  //       // ...
  //     });
  //   } catch (error) {
  //     console.error('Error al obtener los datos del dólar:', error);
  //   }
  // };


// const fetchDayliSales = async() => {

//     try{
//       const response = await fetch('http://localhost:5040/api/report/daily-sales');
//       const data = await response.json();
//       setDataDailySale(data);

//     }catch(error){

//       console.error('Error al obtener los datos del dólar:', error);

//     }


// }
const [salesCount, setSalesCount] = useState(0);



  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Escritorio | ZeronCold </title>
      </Helmet>

      <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={9}>
          <Typography variant="h4" sx={{ mb: 5 }}>
         Escritorio
        </Typography>


          </Grid>
          </Grid>
          <hr/>


          <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ backgroundColor: '#ff5722', padding: 5, borderRadius:5 , marginRigth:2 }}>
          <Paper  style={{backgroundColor:"#ffffff0a"}} elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h5" style={{color:"white"}}>total tareas </Typography>
      <Typography variant="h3" color="white">
        {valoresDolar.bcv}
      </Typography>
    </Paper>
    </Box>
</Grid>

<Grid item xs={12} md={6} lg={4}>
  <Box sx={{ backgroundColor: '#00cc99', padding: 5 ,borderRadius:5  }}>
          <Paper style={{backgroundColor:"#ffffff0a"}} elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h5" style={{color:"white"}}>Otra cosa aqui</Typography>
      <Typography variant="h3" color="white">
        {valoresDolar.enparalelovzla}
      </Typography>
    </Paper>
    </Box>
    </Grid>
   
    <Grid item xs={12} md={6} lg={4}>
          {/* <MonetizationOnIcon style={{color:'red'}}/> */}
          <Box sx={{ backgroundColor: '#007bff', padding: 5,  borderRadius:5 }}>
          <Paper style={{backgroundColor:"#ffffff0a"}} elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h5" style={{color:"white"}}>
        Tareas<br/> de el dia</Typography>
      <Typography variant="h3" color="white">
        {salesCount}
      </Typography>
    </Paper>
    </Box>
</Grid>
</Grid>




     
      </Container>
      <hr/>
      <Typography variant="h4" sx={{ mb: 5 }}>
         Modulos 
        </Typography>
      <ModuleLinks/>
      <FloatingButtonComponent/>
    </>
  );
}
