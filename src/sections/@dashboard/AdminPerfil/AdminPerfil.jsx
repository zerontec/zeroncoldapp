import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import styled from 'styled-components';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,

} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { DriveFolderUpload } from '@mui/icons-material';
// import { getCustomerById } from   'tu_accion_para_obtener_cliente_por_id';
// import { getCustomerPurchases } from 'tu_accion_para_obtener_compras_de_cliente';
import { serachUsereById } from '../../../redux/modules/user';
import { getAllLoans } from '../../../redux/modules/loan';

import { fDate, fDateTime } from '../../../utils/formatTime';
import { FloatingButtonComponent } from '../../../components/FloatingButtonComponent';
import { CreateLoan } from '../../../components/CreateLoan';


const columns = [
	{
	  id: "id",
	  label: "Id",
	  minWidth: 50,
	},
	{
		id: "name",
		label: "Nombre",
		minWidth: 100,
	  },
	{
	  id: "name",
	  label: "Cantidad",
	  minWidth: 100,
	},
	{
	  id: "age",
	  label: "Status",
	  minWidth: 50,
	},
	{
		id: "fecha",
		label: "Fecha ",
		minWidth: 50,
	  },
	  {
		id: "notes",
		label: "Motivo",
		minWidth: 50,
	  },
	  
	  
	
  ];


const StyledContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

const AdminPerfil = () => {

	const { id} = useParams();
	const dispatch = useDispatch();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");

  
	const [user, setUser] = useState(null);

	const [deudas, setDeudas] = useState([]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };
	
	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	  };
	
	

const usuarios = useSelector((state)=> state.usuarios)
const deuda = useSelector((state) => state.loan)
console.log("usuarios",usuarios)
console.log("deuda", deuda)
useEffect(() => {

	  // Llamada a la API para obtener los datos del cliente
	  dispatch(serachUsereById({id}))
		.then((response) => setUser(response))
		.catch((error) => console.log(error));
		// dispatch(getClientPurchase({id}))
		// .then((response) => setCompras(response))
		// .catch((error) => console.log(error));
  
		dispatch(getAllLoans())
		.then((response) => setDeudas(response))
		.catch((error) => console.log(error));

	}, [id, dispatch]);
  

fDateTime()

	return (
	  <StyledContainer>
		{/* {customer && ( */}
		  <>
			<Box sx={{ marginBottom: '24px' }}>
			  <Typography variant="h4" component="h1">
				Perfil de Administrador:
			  </Typography>
			  <Typography variant="body1">
				
				<strong>Nombre: {usuarios.usuarios.name}</strong> 
			  </Typography>
			  <Typography variant="body1">
				
				<strong>Cédula o Rif: {usuarios.usuarios.username}</strong> 
			  </Typography>
			 
			  <Typography variant="body1">
				
				<strong>Direccion: {usuarios.usuarios.email}</strong> 
			  </Typography> 

			   <Typography variant="body1">
				<strong>Fecha de Registro: {fDateTime(usuarios.usuarios.createdAt)}</strong> 
			  </Typography> 
			   {/* <Typography variant="body1">
				
				<strong>Total gastado: {compra.invoices. totalPurchases}</strong> 
			  </Typography> */}
			  {/* Agrega más datos del cliente según tus necesidades */}
			
			<CreateLoan/>
			
			
			</Box>



			<Typography variant="h5" component="h3">
				Deudas Empleados 
			  </Typography>

		  
			  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="left"
            minWidth={column.minWidth}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
	<TableBody>
  {Array.isArray(deuda.loans) && deuda.loans.length > 0 ? (
    deuda.loans
      .filter((item) =>
        item.amount.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item) => (
        <TableRow key={item.id}>
          <TableCell align="left">{item.seller?.codigo}</TableCell>
		  <TableCell align="left">{item.seller?.name}</TableCell>
          <TableCell align="left">{item.amount}</TableCell>
          <TableCell align="left">{item.status}</TableCell>
          <TableCell align="left">{fDateTime(item.createdAt)}</TableCell>
          <TableCell align="left">{item.notes}</TableCell>
          {/* Agrega más columnas según las propiedades de la deuda */}
        
		  <Link
              to={`/dashboard/perfil-empleados/${item.seller?.id}`}
              style={{ textDecoration: 'none' }}
            >
              <button>Ver perfil</button>
            </Link>
		</TableRow>
      ))
  ) : (
	
    <TableRow>
		   
      <TableCell colSpan={columns.length}>No hay datos disponibles</TableCell>
    </TableRow>
  )}
</TableBody>







  </Table>
  <TablePagination
    rowsPerPageOptions={[5, 10, 100]}
    component="div"
    count={deuda.loans.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</TableContainer>


<FloatingButtonComponent/>
		  </>
		{/* // )} */}
	  </StyledContainer>
	);


	
};


export default AdminPerfil;
